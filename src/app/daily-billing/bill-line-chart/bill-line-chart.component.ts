import {Component, Input, OnInit} from '@angular/core';
import {scaleTime, scaleLinear, extent, timeFormat, axisLeft, axisBottom, curveMonotoneX, select, selectAll, line} from 'd3';
import {Bill} from '../pojo/bill';

@Component({
  selector: 'app-bill-line-chart',
  templateUrl: './bill-line-chart.component.html',
  styleUrls: ['./bill-line-chart.component.styl']
})
export class BillLineChartComponent implements OnInit {
  @Input()
  width: number;
  @Input()
  height: number;
  @Input()
  initialBalance: number;
  @Input()
  data: Bill[];
  private margin = {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  };
  private yScale: any;
  private xScale: any;
  private cx: any;
  private cy: any;
  private line: any;
  private xAxis: any;
  private yAxis: any;

  transformData(data: Bill[]) {
    let minV: number = this.initialBalance || Number.MAX_VALUE;
    let maxV: number = this.initialBalance || Number.MIN_VALUE;
    const length = data.length || 0;
    const entrySet = {};
    data.map((d: Bill) => {
      // calc same date amount
      const amount = entrySet[d.date] ? (entrySet[d.date].amount = (entrySet[d.date].amount + d.amount)) : d.amount;
      entrySet[d.date] = Object.assign({...d}, {amount});
    });
    Object.values(entrySet).map((d: Bill) => {
      minV = Math.min(d.amount, minV);
      maxV = Math.max(d.amount, maxV);
    });
    return {
      length,
      minV,
      maxV,
      data: Object.values(entrySet)
    };
  }

  ngOnInit() {
    this.render();
  }

  render() {
    const [l, r, t, b, w, h, dt] = [this.margin.left, this.margin.right, this.margin.top, this.margin.bottom,
      this.width, this.height, this.transformData(this.data)];
    const length = dt.length;
    this.yAxis = [dt.minV, dt.maxV];
    this.xAxis = [0, length];
    this.xScale = scaleTime().domain(extent(dt.data, (d: any) => d.date)).range([0, w]);
    this.yScale = scaleLinear().domain(this.yAxis).range([h, 0]);
    const cx = this.cx = (d: any) => this.xScale(d.date);
    const cy = this.cy = (d: any) => this.yScale(d.amount);
    const id = (d: any, index: number) => `dot-${index}`;
    const aBottom = axisBottom(this.xScale)
      .tickFormat(timeFormat('%m/%d/%Y'))
      .tickValues(dt.data.map((d: any) => d.date))
      .tickSize(-h);
    const aLeft = axisLeft(this.yScale)
      .tickSize(-w);
    const ln = this.line = line()
      .x(cx)
      .y(cy)
      .curve(curveMonotoneX);
    const dotMouseOver = (d: any) => {
      tooltip.style('display', null);
      tooltip.attr('transform', `translate(${Math.min(cx(d), this.width - 115)}, ${cy(d)})`);
      tooltip.select('.tooltip-amount').text(d.amount);
      tooltip.select('.tooltip-date').text(new Date(d.date).toLocaleDateString('en-US'));
      tooltip.select('.tooltip-summary').text(d.summary);
    };
    const dotMouseOut = () => {
      tooltip.style('display', 'none');
    };
    const svg = select('svg')
      .attr('width', w + l + r)
      .attr('height', h + t + b)
      .append('g')
      .attr('transform', `translate(${l}, ${t})`);
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${h})`)
      .style('stroke-dasharray', ('3,3'))
      .call(aBottom);
    svg.append('g')
      .attr('class', 'y axis')
      .style('stroke-dasharray', ('3,3'))
      .call(aLeft);
    svg.append('path')
      .datum(dt.data)
      .attr('class', 'line')
      .attr('d', ln);
    svg.selectAll('.dot')
      .data(dt.data)
      .enter()
      .append('circle')
      .attr('id', id)
      .attr('class', 'dot')
      .attr('cx', cx)
      .attr('cy', cy)
      .on('mouseover', dotMouseOver)
      .on('mouseout', dotMouseOut);
    const tooltip = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');
    tooltip.append('circle')
      .attr('focus-dot');
    tooltip.append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 70)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 5)
      .attr('ry', 4);
    tooltip.append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 18)
      .attr('y', -2);
    tooltip.append('text')
      .attr('class', 'tooltip-amount')
      .attr('x', 18)
      .attr('y', 18);
    tooltip.append('text')
      .attr('class', 'tooltip-summary')
      .attr('x', 18)
      .attr('y', 38);
  }

  refreshDot() {
    // refresh yAxis and scale properties
    const opt = this.transformData(this.data);
    this.yAxis = [opt.minV, opt.maxV];
    this.yScale = scaleLinear().domain(this.yAxis).range([this.height, 0]);
    // update yAxis rendering
    // @ts-ignore
    select('.y').transition().call(axisLeft(this.yScale).tickSize(-this.width));
    // update dots position
    selectAll('.dot').data(opt.data).transition().attr('cy', (d: any) => this.yScale(d.amount));
    // update line path
    select('.line').datum(opt.data).transition().attr('d', this.line);
  }
}
