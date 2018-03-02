# D3 Donut Chart Directive for JavaScript

### A JavaScript library that provide easy way to create donut chart simply setting atributes in a <div> tag.

## How to use:
- Import **d3-donut-chart-directive** in the html file that you want to use.

```html
<htnl>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/NetoRutes/d3-donut-chart-directive-js/fe7abafb/style/d3-donut-chart.min.css">
    </head>

    <body>
        ...
    </body>

    <script src="https://d3js.org/d3.v4.min.js"></script>
    <script src="https://d3js.org/d3-scale-chromatic.v0.3.min.js"></script>

    <script src="https://cdn.rawgit.com/NetoRutes/d3-donut-chart-directive-js/fe7abafb/script/d3-donut-chart.min.js"></script>

</htnl>
```

- Create divs with custom atributes and add donut-chart as style class.
```html
...
<body>
    ...
    <div 
        class="donut-chart" 
        colorScheme="schemeCategory20b"
        label="taxonomy"
        slice="reads"
        size="600"
        tooltip="circle"
        tooltip-msg="Amount of reads </br>reads: {{reads}}!"
        url="http://www.mocky.io/v2/5a985ae62e000001075532fb" 
    ></div>
    ...
</body>
...
```

> JSON requested in this example have this content:

```json
[
        {
                "taxonomy": 2759,
		"reads": 294481
	},
	{
		"taxonomy": 134362,
		"reads": 97446
	},

	{
		"taxonomy": 147541,
		"reads": 141340
	},
	{
		"taxonomy": 4890,
		"reads": 183141
	},
	{
		"taxonomy": 452563,
		"reads": 94952
	}
]
```

- Done, now can see your chart in the browser:

![N|Solid](./resources/donut_chart.png)


## Attributes Table
| Attr | Type | Default | Values | Required |
| ------ | ------ | ------ | ------ | ------ |
| class | string | - | "donut-chart" | True |
| colorScheme | string | "schemeCategory10" | ["schemeAccent", "schemeDark2", "schemePastel2", "schemeSet2", "schemeSet1", "schemePastel1", "schemeCategory10", "schemeSet3", "schemePaired", "schemeCategory20", "schemeCategory20b", "schemeCategory20c"] | False |
| label | string | "name" | Type a json column name (Ex: "taxonomy"). | False |
| slice | string | "value" | Type a json column name (Ex: "reads"). | False |
| size | string | "300" | Type a value (Ex: "400"). | False |
| tooltip | string | "circle" | ["circle", "popover"] | False |
| tooltip-msg | string | - | Type a message (Ex: "Number of reads: {{reads}}") | False |
| url | string | - | Type a url or a path (Ex: "../mock.json" or "http://domain.com/get_json_file") | True |


## Atributes details

#### **CLASS DONUT-CHART** 
- It's the key attr to indicate that the div render a donut chart.
```html
class="donut-chart"
```

#### **COLORSCHEME** 
- Specify the d3 scale chromatic that the donut directive use to paint each of the chart's slice. For more information take a look in these links: 
- https://github.com/d3/d3-scale-chromatic  
- https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

```html
colorScheme="schemeCategory20b"
```

#### **LABEL** 
- Specify the field that the donut directive use to print the label of the chart's slices.
```html
label="taxonomy"
```

#### **SLICE** 
- Specify the field that the donut directive use to render the chart's slices.
```html
slice="reads"
```

#### **SIZE** 
- Specify the size (height/width) of the donut chart.
```html
size="300"
```

#### **TOOLTIP** 
- Specify the style of tooltip that is rendered when mouse is hover a slice. 
Have two styles: First the "circle" that is a circle inside the donut and second, the "popover" that is a popover above the mouse pointer. When circle is setted, the popover is showed with percentage of each slice when mouse over then. But when popover is setted, popover is overrided by the new message.
```html
tooltip="circle"
```
```html
tooltip="popover"
```

#### **TOOLTIP** 
- Specify the message to render inside tooltip. It can be a html string if tooltip is setted as "popover". The directive support write one attribute inside double braces {{}}.
```html
tooltip-msg="Amount of reads </br>reads: {{reads}}!"
```

#### **URL** 
- Specify the endpoint or file path to get json data to render the chart.
```html
url="http://www.mocky.io/v2/5a94693f3500003c009b0e95"
```
```html
url="./mock/mock.json"
```

## License

MIT LICENSE


