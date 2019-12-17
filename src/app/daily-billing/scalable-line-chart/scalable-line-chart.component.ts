import {Component, Input, OnInit} from '@angular/core';
import {
  axisBottom,
  axisLeft,
  brushX,
  event,
  extent,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
  timeParse,
  zoom,
  zoomIdentity
} from 'd3';
import {SortByDatePipe} from '../../shared/pipe/sort-by-date.pipe';
import {MergeAmountByDatePipe} from '../../shared/pipe/merge-amount-by-date.pipe';

@Component({
  selector: 'app-scalable-line-chart',
  templateUrl: './scalable-line-chart.component.html',
  styleUrls: ['./scalable-line-chart.component.styl']
})
export class ScalableLineChartComponent implements OnInit {
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  data: any[];
  selectBill: {
    date: any,
    amount: number,
    summary: string,
    x: number,
    y: number
  };

  resposiveOffset() {
    const screenSize = window.innerWidth;
    let offset = 0;
    if (screenSize >= 1400) {
      offset = 45;
    } else if (screenSize >= 768) {
      offset = 30;
    }
    return offset;
  }


  ngOnInit() {
    let timer: any = null;
    window.addEventListener('dot-clicked', (payload: any) => {
      this.selectBill = payload.detail;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => this.selectBill = null, 3000);
    });
    const sortByDatePipe: SortByDatePipe = new SortByDatePipe();
    const mergeAmountByDatePipe: MergeAmountByDatePipe = new MergeAmountByDatePipe();
    let data = transformData(this.data);
    const svg = select('svg');
    const margin = {top: 20, right: 20, bottom: 110, left: 40};
    const margin2 = {top: 430, right: 20, bottom: 30, left: 40};
    const width = +window.innerWidth - margin.left - margin.right - this.resposiveOffset();
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const height2 = +svg.attr('height') - margin2.top - margin2.bottom;

    const parseDate = timeParse('%m/%d/%Y %H:%M');

    const x = scaleTime().range([0, width]);
    const x2 = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);
    const y2 = scaleLinear().range([height2, 0]);

    const xAxis = axisBottom(x);
    const xAxis2 = axisBottom(x2);
    const yAxis = axisLeft(y);

    const brush = brushX()
      .extent([[0, 0], [width, height2]])
      .on('brush end', brushed);

    const z = zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', zoomed);

    const ln = line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.amount));

    const line2 = line()
      .x((d: any) => x2(d.date))
      .y((d: any) => y2(d.amount));

    svg.append('defs').append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', 0)
      .attr('y', 0);
    svg.append('rect')
      .attr('class', 'zoom')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(z);
    const focus = svg.append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const context = svg.append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

    const lineChart = svg.append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .attr('clip-path', 'url(#clip)');

    x.domain(extent(data, (d: any) => d.date));
    y.domain([min(data, (d: any) => Number(d.amount)), max(data, (d: any) => Number(d.amount))]);
    x2.domain(x.domain());
    y2.domain(y.domain());


    focus.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    focus.append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis);

    lineChart.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', ln);

    lineChart.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: any) => x(d.date))
      .attr('cy', (d: any) => y(d.amount))
      .attr('r', 10)
      .attr('title', (d: any) => d.amount)
      .on('click', (d: any) => {
        window.dispatchEvent(new CustomEvent('dot-clicked', {detail: {...d, x: 60, y: y(d.amount)}}));
      });

    context.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line2);

    context.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2);

    context.append('g')
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, x.range());


    function brushed() {
      if (event.sourceEvent && event.sourceEvent.type === 'zoom') {
        return;
      } // ignore brush-by-zoom
      const s = event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      lineChart.selectAll('.dot').transition().attr('cx', (d: any) => x(d.date));
      lineChart.select('.line').transition().attr('d', ln);
      focus.select('.axis--x').call(xAxis);
      svg.select('.zoom').call(z.transform, zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
    }

    function zoomed() {
      if (event.sourceEvent && event.sourceEvent.type === 'brush') {
        return;
      }
      const t = event.transform;
      x.domain(t.rescaleX(x2).domain());
      lineChart.selectAll('.dot').transition().attr('cx', (d: any) => x(d.date));
      lineChart.select('.line').transition().attr('d', ln);
      focus.select('.axis--x').call(xAxis);
      context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
    }

    function type(d) {
      d.date = parseDate(d.date);
      d.amount = +d.amount;
      return d;
    }

    function transformData(d: any): any[] {
      return mergeAmountByDatePipe.transform(sortByDatePipe.transform(d));
    }

    window.addEventListener('amount-changed', (payload: any) => {
      if (payload && payload.detail) {
        data = transformData(payload.detail);
        y.domain([min(data, (d: any) => Number(d.amount)), max(data, (d: any) => Number(d.amount))]);
        const fn = (d: any) => y(d.amount);
        const ln1 = line()
          .x((d: any) => x(d.date))
          .y(fn);
        const ln2 = line()
          .x((d: any) => x2(d.date))
          .y((d: any) => y2(d.amount));
        y2.domain(y.domain());
        lineChart.selectAll('.dot').data(data).transition().attr('cy', fn);
        lineChart.select('.line').datum(data).transition().attr('d', ln1);
        context.select('.line').datum(data).transition().attr('d', ln2);
        focus.selectAll('.axis--y').call(yAxis);
      }
    });
  }
}
