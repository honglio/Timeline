(function(exports) {
    "use strict";

    function calcLegendOptionsForBloodPressure() {
        var legend = {
            itemStyle: {
                "color": "#414141",
                "fontSize": "1em"
                    // "fontWeight": "bold"
            },
            itemDistance: 10,
            padding: 0,
            margin: 0,
            itemMarginTop: 20,
            itemMarginBottom: 5
        };
        return legend;
    }


    function calcLegendOptionsForBloodSugar() {
        var legend = {
            itemStyle: {
                "color": "#414141",
                "fontSize": "1em"
                    // "fontWeight": "bold"
            },
            itemDistance: 10,
            padding: 0,
            margin: 0,
            itemMarginTop: 5,
            itemMarginBottom: 5
        };
        return legend;
    }

    function calcPointForBloodPressure(data) {
        var bpTime = [],
            bpTop = [],
            bpBottom = [];

        if (data.length > 0) {
            data.forEach(function(item) {
                if (+item.top > 139 || +item.top < 120) {
                    bpTop.push({ y: +item.top, color: 'red' });
                } else {
                    bpTop.push(+item.top);
                }

                if (+item.bottom > 90 || +item.bottom < 80) {
                    bpBottom.push({ y: +item.bottom, color: 'red' });
                } else {
                    bpBottom.push(+item.bottom);
                }

                bpTime.push(item.inspectionDate);
            });
        }

        return {
            time: bpTime,
            top: bpTop,
            bottom: bpBottom
        };
    }

    function calcPointForBloodSugar(data) {
        var bsTime = [],
            bsTop = [],
            bsBottom = [];

        if (data.length > 0) {
            data.forEach(function(item) {
                if (item.top) {
                    if (+item.top > 7.7) {
                        bsTop.push({ y: +item.top, color: 'red' });
                    } else {
                        bsTop.push(+item.top);
                    }
                } else {
                    bsTop.push({ y: 7, color: '#eee' });
                }

                if (item.bottom) {
                    if (+item.bottom > 6.0 || +item.bottom < 3.9) {
                        bsBottom.push({ y: +item.bottom, color: 'red' });
                    } else {
                        bsBottom.push(+item.bottom);
                    }
                } else {
                    bsBottom.push({ y: 4, color: '#eee' });
                }

                bsTime.push(item.inspectionDate);
            });
        }

        return {
            time: bsTime,
            top: bsTop,
            bottom: bsBottom
        };
    }

    function calcAxisForBloodPressure(series) {
        var yAxis;

        if (series.time.length > 0) {
            yAxis = {
                title: {
                    enabled: false,
                    text: 'Value',
                    style: {
                        fontSize: '1.3em'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    },
                    style: {
                        fontSize: '1.3em'
                    },
                    x: -10
                },
                plotBands: [{ // Light air
                    from: 60,
                    to: 89,
                    color: 'none'
                }, { // Light breeze
                    from: 90,
                    to: 139,
                    color: 'none'
                }],
                tickInterval: 20,
                gridLineWidth: 0,
                lineWidth: 0
            };
        } else {
            yAxis = {
                tickPositions: [40, 60, 80, 100, 120, 140, 160],
                title: {
                    enabled: false,
                    text: 'Value',
                    style: {
                        fontSize: '1.3em'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    },
                    style: {
                        fontSize: '1.3em'
                    },
                    x: -10
                },
                plotBands: [{ // Light air
                    from: 60,
                    to: 89,
                    color: 'none'
                }, { // Light breeze
                    from: 90,
                    to: 139,
                    color: 'none'
                }],
                tickInterval: 20,
                gridLineWidth: 0,
                lineWidth: 0
            };
        }

        return yAxis;
    }

    function calcAxisForBloodSugar(series) {
        var yAxis;

        if (series.time.length > 0) {
            yAxis = {
                title: {
                    enabled: false,
                    text: 'Value',
                    style: {
                        fontSize: '1.3em'
                    }
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    },
                    style: {
                        fontSize: '1.3em'
                    },
                    x: -20
                },
                plotBands: [{ // Light air
                    from: 3.9,
                    to: 6.1,
                    color: 'none'
                        // label: {
                        //     text: '低压区',
                        //     style: {
                        //         color: '#606060'
                        //     }
                        // }
                }],
                plotLines: [{
                    color: 'none',
                    width: 1,
                    value: 7.7,
                    dashStyle: 'longdash'
                }],
                tickInterval: 2,
                gridLineWidth: 0,
                lineWidth: 0
            };
        } else {
            yAxis = {
                title: {
                    enabled: false,
                    text: 'Value',
                    style: {
                        fontSize: '1.3em'
                    }
                },
                tickPositions: [2, 4, 6, 8, 10, 12],
                labels: {
                    formatter: function() {
                        return this.value;
                    },
                    style: {
                        fontSize: '1.3em'
                    },
                    x: -20
                },
                plotBands: [{ // Light air
                    from: 3.9,
                    to: 6.1,
                    color: 'none',
                    // color: 'rgba(156, 218, 218, 0.15)'
                    // label: {
                    //     text: '低压区',
                    //     style: {
                    //         color: '#606060'
                    //     }
                    // }
                }],
                plotLines: [{
                    color: 'none',
                    width: 1,
                    value: 7.7,
                    dashStyle: 'longdash'
                }],
                tickInterval: 2,
                gridLineWidth: 0,
                lineWidth: 0
            };
        }

        return yAxis;
    }

    function calcChartOptionForBloodPressure(legend, series, axis) {
        return {
            chart: {
                type: 'line',
                spacingBottom: 0,
                backgroundColor: '#a0dc94'
            },
            noData: {
                style: {
                    fontSize: '20px',
                    color: '#a0a0a0'
                }
            },
            title: {
                text: '',
                style: {
                    fontSize: '20px'
                }
            },
            legend: legend,
            xAxis: {
                categories: series.time,
                labels: {
                    enabled: false,
                    style: {
                        fontSize: '1.4em'
                    }
                },
                tickWidth: 0,
                lineWidth: 0
            },
            yAxis: axis,
            tooltip: {
                formatter: function() {
                    // return '<b>' + this.series.name + '</b><br/>' +
                    //     this.x + ': ' + this.y;
                    return '<b>' + this.y + '</b>';
                },
                style: {
                    fontSize: '1.4em'
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        radius: 5,
                        lineColor: '#fff',
                        lineWidth: 0
                    },
                    events: {
                        legendItemClick: function() {
                            // alert('I am an alert');
                            return false;
                            // <== returning false will cancel the default action
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'High 90~139mmHg',
                data: series.top,
                color: '#629b57',
                lineWidth: 2
            }, {
                name: 'Low 60~90mmHg',
                data: series.bottom,
                color: '#ffffff',
                lineWidth: 2
            }],
            symbols: ["circle", "circle", "circle", "circle", "circle", "circle"]
        };
    }

    function calcChartOptionForBloodSugar(legend, series, axis) {
        return {
            chart: {
                type: 'line',
                spacingBottom: 0,
                backgroundColor: '#4cc9d5'
            },
            noData: {
                style: {
                    fontSize: '20px',
                    color: '#a0a0a0'
                }
            },
            title: {
                text: '',
                style: {
                    fontSize: '20px'
                }
            },
            // subtitle: {
            //     text: '收缩压 90～140mmHg 舒张压 60～90mmHg',
            //     floating: true,
            //     align: 'center',
            //     verticalAlign: 'bottom',
            //     y: 15
            // },
            // legend: {
            //     layout: 'vertical',
            //     align: 'left',
            //     verticalAlign: 'top',
            //     x: 150,
            //     y: 100,
            //     floating: true,
            //     borderWidth: 1,
            //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            // },
            legend: legend,
            xAxis: {
                categories: series.time,
                labels: {
                    enabled: false,
                    style: {
                        fontSize: '1.4em'
                    }
                },
                tickWidth: 0,
                lineWidth: 0
            },
            yAxis: axis,
            tooltip: {
                formatter: function() {
                    // return '<b>' + this.series.name + '</b><br/>' +
                    //     this.x + ': ' + this.y;
                    return '<b>' + this.y + '</b>';
                },
                style: {
                    fontSize: '1.4em'
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        radius: 5,
                        lineColor: '#fff',
                        lineWidth: 0
                    },
                    events: {
                        legendItemClick: function() {
                            // alert('I am an alert');
                            return false;
                            // <== returning false will cancel the default action
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'After Meal ≤7.7mmol/L',
                data: series.top,
                color: '#35777d',
                lineWidth: 2
            }, {
                name: 'Before Meal 3.9~6.0mmol/L',
                data: series.bottom,
                color: '#ffffff',
                lineWidth: 2
            }],
            symbols: ["circle", "circle", "circle", "circle", "circle", "circle"]
        };
    }

    /**
     * Make bloodpressure chart to the specified selector place
     * e.g., window.makeBloodPressureChart(data, '#containter1')
     * @method makeBloodPressureChart
     * @param {data} [object] bloodpressure data
     * @param {selector} [string] jQuery selector string.  Defaults to body.
     * @returns 
     *
     */

    exports.makeBloodPressureChart = function(data, selector) {
        var legend = calcLegendOptionsForBloodPressure();
        var series = calcPointForBloodPressure(data || []);
        var axis = calcAxisForBloodPressure(series);
        var options = calcChartOptionForBloodPressure(legend, series, axis);

        window.Highcharts.setOptions({
            lang: {
                noData: 'No Data',
                loading: 'Loading...'
            }
        });

        $(selector || 'body').highcharts(options);
    }

    /**
     * Make blood sugar chart to the specified selector place
     * e.g., window.makeBloodSugarChart(data, '#containter2')
     * @method makeBloodSugarChart
     * @param {data} [object] blood sugar data
     * @param {selector} [string] jQuery selector string.  Defaults to body.
     * @returns 
     *
     */

    exports.makeBloodSugarChart = function(data, selector) {
        var legend = calcLegendOptionsForBloodSugar();
        var series = calcPointForBloodSugar(data || []);
        var axis = calcAxisForBloodSugar(series);
        var options = calcChartOptionForBloodSugar(legend, series, axis);

        window.Highcharts.setOptions({
            lang: {
                noData: 'No Data',
                loading: 'Loading...'
            }
        });

        $(selector || 'body').highcharts(options);
    }

})(typeof exports === 'undefined' ? this['setting'] = {} : exports);
