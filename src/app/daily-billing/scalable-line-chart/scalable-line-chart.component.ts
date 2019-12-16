import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {timeFormat} from 'd3';
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
    const svg = d3.select('svg');
    const margin = {top: 20, right: 20, bottom: 110, left: 40};
    const margin2 = {top: 430, right: 20, bottom: 30, left: 40};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const height2 = +svg.attr('height') - margin2.top - margin2.bottom;

    const parseDate = d3.timeParse('%m/%d/%Y');

    const x = d3.scaleTime().range([0, width]);
    const x2 = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const y2 = d3.scaleLinear().range([height2, 0]);

    const xAxis = d3.axisBottom(x).tickFormat(timeFormat('%m/%d/%Y'));
    const xAxis2 = d3.axisBottom(x2).tickFormat(timeFormat('%m/%d/%Y'));
    const yAxis = d3.axisLeft(y);

    const brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on('brush end', brushed);

    const zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', zoomed);

    const line = d3.line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.amount));

    const line2 = d3.line()
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
      .call(zoom);
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

    x.domain(d3.extent(data, (d: any) => d.date));
    y.domain([d3.min(data, (d: any) => Number(d.amount)), d3.max(data, (d: any) => Number(d.amount))]);
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
      .attr('d', line);

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
        window.dispatchEvent(new CustomEvent('dot-clicked', {detail: {...d, x: x(d.date), y: y(d.amount)}}));
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
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') {
        return;
      } // ignore brush-by-zoom
      const s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      lineChart.selectAll('.dot').transition().attr('cx', (d: any) => x(d.date));
      lineChart.select('.line').transition().attr('d', line);
      focus.select('.axis--x').call(xAxis);
      svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
    }

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') {
        return;
      }
      const t = d3.event.transform;
      x.domain(t.rescaleX(x2).domain());
      lineChart.selectAll('.dot').transition().attr('cx', (d: any) => x(d.date));
      lineChart.select('.line').transition().attr('d', line);
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
        y.domain([d3.min(data, (d: any) => Number(d.amount)), d3.max(data, (d: any) => Number(d.amount))]);
        const fn = (d: any) => y(d.amount);
        const ln = d3.line()
          .x((d: any) => x(d.date))
          .y(fn);
        lineChart.selectAll('.dot').data(data).transition().attr('cy', fn);
        lineChart.select('.line').datum(data).transition().attr('d', ln);
        focus.selectAll('.axis--y').call(yAxis);
      }
    });
  }
}
