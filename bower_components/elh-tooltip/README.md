# elh-tooltip

A light directive to create tooltip in Angular

## Installation

### Bower
Install the package with: `bower install elh-tooltip` then add the files to your index.html
```
<link rel="stylesheet" href="./bower_components/tooltip.css">

<script src="./bower_components/elh-tooltip/tooltip.js">
```

### npm:
Install the package with: `npm install elh-tooltip` then add the files to your index.html
```
<link rel="stylesheet" href="./node_modules/elh-tootip/tooltip.css">

<script src="./nodes_modules/elh-tooltip/tooltip.js">
```

### Manually:
Clone the repository with `git clone https://github.com/Elhebert/elh-tooltip.git` then add the files to your index.html
```
<link rel="stylesheet" href="/path/to/elh-tooltip/tooltip.css">

<script src="/path/to/elh-tooltip/tooltip.js">
```

## Usage

```
<element tooltip=""MyTooltip"></element>
```

## Customisation

### Design
Add the following rules to your scss/sass/css file:

Using sass or scss:
```
[tooltip] {
	// Element for which the tooltip appear
	 .tooltip {
		// Tooltip
		&.active .tooltip {
			//Tooltip when active
		}
	 }
}
```

Using css:
```
[tooltip] {
	// Element for which the tooltip appear
}
[tooltip] .tooltip {
	// Tooltip
}
[tooltip].active .tooltip {
	//Tooltip when active
}
```

### Placement
You can modify the placement of the tooltip by changing the following lines in **tooltip.js**
```
childElement.css({
	top: element[0].offsetTop + (element[0].offsetHeight / 2) + 'px',
	left: element[0].offsetLeft - (childElement[0].offsetWidth / 2) + (element[0].offsetWidth / 2) + 'px',
});
```
