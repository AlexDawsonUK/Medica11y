'use strict';
function download(filename, encode, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:' + encode + ';charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
document.getElementById('import').addEventListener('change', function selectedFileChanged() {
	// Import JSON To Continue Progress
	if (this.files.length === 0) { return; }
	const reader = new FileReader();
	reader.onload = function fileReadCompleted() {
		let json = JSON.parse(reader.result)
		for (let i = 0; i < Object.keys(json).length; i++) {
			for (const [name, value] of Object.entries(json)) {
				document.getElementById(name).checked = value;
				document.getElementById(name).value = value; } } };
	reader.readAsText(this.files[0]);
});
(function export_json(){
	// Save Progress To JSON Download
	let button = document.getElementById('export-json');
	button.addEventListener('click', function(){
		var myObj = {};
		var elements = document.querySelectorAll( 'input[type=date], input[type=number], input[type=text], input[type=checkbox], select, textarea' );
		for ( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.id; var value = element.value; var checked = element.checked;
			if ((name) && (value != '')) {
				if (elements[i].getAttribute('type') == 'checkbox' ) {
					myObj[name] = checked;}
				else {
					myObj[name] = value; } } }
		let myJSON = JSON.stringify(myObj);
		download('Medica11y.json', 'application/json', myJSON); }, false);
})();
(function export_html(){
	// Save Progress To HTML Download
	let button = document.getElementById('export-html');
	button.addEventListener('click', function(){
	// HTML Head
	let header =  	'<!DOCTYPE html>' + '\n' +
					'<html lang="en">' + '\n' +
					'	<head>' + '\n' +
					'		<meta charset="utf-8">' + '\n' +
					'		<meta http-equiv="X-UA-Compatible" content="IE=edge">' + '\n' +
					'		<meta name="viewport" content="width=device-width, initial-scale=1">' + '\n' +
					'		<title>Medica11y - Your Personal Health Record (PHR)</title>' + '\n' +
					'		<meta name="description" content="Your Personal Health Record (PHR), Medica11y allows you to generate a detailed list of specialisms, diagnoses, complications, investigations and treatments.">' + '\n' +
					'		<meta name="apple-mobile-web-app-title" content="Medica11y">' + '\n' +
					'		<meta property="og:title" content="Medica11y">' + '\n' +
					'		<meta name="referrer" content="no-referrer">' + '\n' +
					'		<meta property="og:description" content="Your personal health record (PHR), Medica11y allows you to generate a detailed list of specialisms, diagnoses, complications, investigations and treatments.">' + '\n' +
					'		<meta property="og:type" content="website">' + '\n' +
					'		<meta property="og:locale" content="en_us">' + '\n' +
					'		<meta property="og:url" content="https://medica11y.com/">' + '\n' +
					'		<style>' + '\n' +
					// Screen CSS Styles
					'			@media screen {' + '\n' +
					'				::selection { background-color: #333333; color: #ffffff; }' + '\n' +
					'				.body { background: #389bd2; }' + '\n' +
					'				.special:checked + .format { background: #d8dde0; }' + '\n' +
					'				.category, .specs { background: #f3f3f3; }' + '\n' +
					'				.avoidance, .category, .clinics, .complications, .contact, .dangerous, .diagnosis, .investigations, .major, .minor, .treatments { border: 0; padding: 0; }' + '\n' +
					'				.category { border-bottom-left-radius: 0.75em; border-bottom-right-radius: 0.75em; padding-top: 0; padding-left: 1em; padding-right: 1em; }' + '\n' +
					'				.specs { margin-bottom: -1px; padding-bottom: 1em; }' + '\n' +
					'				.format { border-color: #333333; border-style: solid; border-bottom-width: 2px; border-left-width: 1px; border-right-width: 1px; border-top-width: 2px; margin-bottom: 0.5em; margin-left: -0.3em; padding: 0.5em; }' + '\n' +
					'				.first { border-bottom-left-radius: 0.5em; border-left-width: 2px; }' + '\n' +
					'				.special:not(:checked) ~ .specs { border-radius: 0.5em; }' + '\n' +
					'				.last { border-bottom-right-radius: 0.5em; border-right-width: 2px; }' + '\n' +
					'				.first, .special:checked ~ .specs { border-top-left-radius: 0.5em; }' + '\n' +
					'				.last, .special:checked ~ .specs { border-top-right-radius: 0.5em; }' + '\n' +
					'				.build, .copyright, .head-txt, .link { color: #ffffff; }' + '\n' +
					'				.copyright:before { content: "\\00a9"; padding-right: 0.2em; }' + '\n' +
					'				.head-txt:after { content: "v1.0"; font-size: 0.5em; margin-left: 0.5em; vertical-align: super; }' + '\n' +
					'				.format, .specs { cursor: pointer; display: inline-block; }' + '\n' +
					'				.svg-cat { display: block; height: 2em; margin: 0 auto; padding-bottom: 0.3em; width: 2em; }' + '\n' +
					'				.footer { display: flex; justify-content: space-around; margin: 2em auto 1em auto; }' + '\n' +
					'				.build, .copyright, .format, .head-txt, .specs, .txt { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; }' + '\n' +
					'				.specs { font-size: 1.4em; width: 100%; }' + '\n' +
					'				.head-txt { font-size: 3em; }' + '\n' +
					'				.pre, .specs { font-weight: bold; }' + '\n' +
					'				.hide, .special, .special[id$="avoidance"]:not(:checked) ~ fieldset[class$="avoidance"], .special:not(:checked) ~ .category, .special[id$="contact"]:not(:checked) ~ fieldset[class$="contact"], .special[id$="dangerous"]:not(:checked) ~ fieldset[class$="dangerous"], .special[id$="diagnosis"]:not(:checked) ~ fieldset[class$="diagnosis"], .special[id$="complications"]:not(:checked) ~ fieldset[class$="complications"], .special[id$="investigations"]:not(:checked) ~ fieldset[class$="investigations"], .special[id$="major"]:not(:checked) ~ fieldset[class$="major"], .special[id$="minor"]:not(:checked) ~ fieldset[class$="minor"], .special[id$="treatments"]:not(:checked) ~ fieldset[class$="treatments"], .special[id$="clinics"]:not(:checked) ~ fieldset[class$="clinics"] { height: 1px; left: -1000px; overflow: hidden; position: relative; width: 1px; }' + '\n' +
					'				.category .special { display: none; }' + '\n' +
					'				.pre, .svg, .svg-bullet { height: 2em; }' + '\n' +
					'				.pre, .svg-bullet { line-height: 2.5; vertical-align: middle; }' + '\n' +
					'				.list { list-style-type: none; padding-left: 0; }' + '\n' +
					'				.category, .specialism { margin: 0 auto; max-width: 850px; }' + '\n' +
					'				.content { margin-left: 1em; margin-top: -1em; }' + '\n' +
					'				.content, .svg-bullet { margin-right: 1em; }' + '\n' +
					'				.list { margin-top: 0; }' + '\n' +
					'				.specs, .txt { padding: 0.5em 0; }' + '\n' +
					'				.txt strong { padding-right: 0.5em; }' + '\n' +
					'				.build, .category, .copyright, .format, .head-txt, .specs { text-align: center; }' + '\n' +
					'				.txt { text-align: left; }' + '\n' +
					'				.specs { text-transform: capitalize; }' + '\n' +
					'				.format, .specs { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }' + '\n' +
					'				.svg, .svg-bullet { width: 2em; }' + '\n' +
					'			}' + '\n' +
					// Print CSS Styles
					'			@media print {' + '\n' +
					'				.avoidance, .category, .clinics, .complications, .contact, .dangerous, .diagnosis, .investigations, .major, .minor, .treatments {' + '\n' +
					'					border: 0; }' + '\n' +
					'				.specialism {' + '\n' +
					'					break-inside: avoid; }' + '\n' +
					'				.link {' + '\n' +
					'					color: inherit;' + '\n' +
					'					text-decoration: none; }' + '\n' +
					'				.body {' + '\n' +
					'					column-gap: 2em;' + '\n' +
					'					column-rule: 0.1em solid #d8dde0;' + '\n' +
					'					font-family: Constantia, Palatino, "Book Antiqua", "Palatino Linotype", serif; }' + '\n' +
					'				.copyright::before {' + '\n' +
					'					content: "\\00a9";' + '\n' +
					'					padding-right: 0.2em; }' + '\n' +
					'				.avoidance::before, .clinics::before, .complications::before, .contact::before, .dangerous::before, .diagnosis::before, .investigations::before, .major::before, .minor::before, .treatments::before {' + '\n' +
					'					content: attr(class);' + '\n' +
					'					text-transform: capitalize; }' + '\n' +
					'				.footer {' + '\n' +
					'					display: flex;' + '\n' +
					'					justify-content: center; }' + '\n' +
					'				.special, .svg, .svg-bullet, .svg-cat {' + '\n' +
					'					display: none; }' + '\n' +
					'				.list {' + '\n' +
					'					margin: 0; } }' + '\n' +
					'			@media screen and (min-width: 661px) {' + '\n' +
					'				.split { display: none; }' + '\n' +
					'			}' + '\n' +
					'			@media screen and (max-width: 660px) {' + '\n' +
					'				#allergy-clinics + label { border-bottom-right-radius: 0.5em; border-right-width: 2px; border-top-right-radius: 0.5em; }' + '\n' +
					'				#allergy-avoidance + label { border-bottom-left-radius: 0.5em; border-left-width: 2px; border-top-left-radius: 0.5em; }' + '\n' +
					'			}' + '\n' +
					'			@media print and (orientation: portrait) {' + '\n' +
					'				.body { column-count: 2; } }' + '\n' +
					'			@media print and (orientation: landscape) {' + '\n' +
					'				.body { column-count: 3; } }' + '\n' +
					// CSS Dark Mode
					'			@media (prefers-color-scheme: dark) {' + '\n' +
					'				.body { background-color: #121212; }' + '\n' +
					'				.category, .specs { background-color: #222222; }' + '\n' +
					'				.special:checked + .format { background-color: #383838; }' + '\n' +
					'				.specs, .txt { color: #dfdfdf; }' + '\n' +
					'				.svg, .svg-bullet, .svg-cat { color: #ffffff; }' + '\n' +
					'		</style>' + '\n' +
					'	</head>' + '\n' +
					// HTML Body
					'	<body class="body">' + '\n' +
					'		<header class="header">' + '\n' +
					'			<h1 class="head-txt">Medica11y</h1>' + '\n' +
					'		</header>' + '\n' +
					'		<main class="content">' + '\n' +
					'			<form action="" method="GET">' + '\n';
	let profile = '';
	let pHead = 	'				<section class="specialism">' + '\n' +
					'					<input class="special" id="profile" name="profile" type="checkbox" value="profile">' + '\n' +
					'					<label class="specs" for="profile"><svg class="svg-cat"><use xlink:href="#icon-profile"/></svg>Profile</label>' + '\n' +
					'					<fieldset class="category">' + '\n' +
					// Profile Validator
					'						<ul class="list" role="list">' + '\n';
												if (document.getElementById('dob').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-dob"/></svg><strong>Date Of Birth:</strong>' + document.getElementById('dob').value + '</li>' + '\n'; }
												if (document.getElementById('hid').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-hid"/></svg><strong>Healthcare ID:</strong>' + document.getElementById('hid').value + '</li>' + '\n'; }
												if (document.getElementById('iid').value != '') {
													let expiry = false;
													if (document.getElementById('exp').value == '') { expiry = true}
													profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-iid"/></svg><strong>Insurance ID:</strong>' + document.getElementById('iid').value;
													if (expiry == true) {
														profile = profile + ' </li>' + '\n'; }
													else {
														profile = profile + ' (<strong>Exp:</strong>' + document.getElementById('exp').value + ')</li>' + '\n'; } }
												var b = ''; if (document.getElementById('pn').value != '') { b = document.getElementById('pn').value } if (document.getElementById('blood').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-blood"/></svg><strong>Blood Type:</strong>' + document.getElementById('blood').value + ' ' + b + '</li>' + '\n'; }
												if (document.getElementById('organ').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-organ"/></svg><strong>Organ Donor:</strong>' + document.getElementById('organ').value + '</li>' + '\n'; }
												if (document.getElementById('diabetic').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-diabetic"/></svg><strong>Diabetes:</strong>' + document.getElementById('diabetic').value + '</li>' + '\n'; }
												var h; if (document.getElementById('ftincm').value == "ftin") {
													if (document.getElementById('height2').value == '') {
														document.getElementById('height2').value = '0' }
													h = document.getElementById('height').value + 'ft ' + document.getElementById('height2').value  + '"';
												} else { h = document.getElementById('height').value + 'cm' }
												if (document.getElementById('height').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-height"/></svg><strong>Height:</strong>' + h + '</li>' + '\n'; }
												var w; if (document.getElementById('slbskg').value == "slbs") {
													if (document.getElementById('weight2').value == '') {
														document.getElementById('weight2').value = '0' }
													w = document.getElementById('weight').value + 'stone ' + document.getElementById('weight2').value  + 'lbs';
												} else { w = document.getElementById('weight').value + 'kg' }
												if (document.getElementById('weight').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-weight"/></svg><strong>Weight:</strong>' + w + '</li>' + '\n'; }
												if (document.getElementById('pulse').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-pulse"/></svg><strong>Pulse:</strong>' + document.getElementById('pulse').value + ' [*]</li>' + '\n'; }
												if ((document.getElementById('sys').value != '') && (document.getElementById('dia').value != '')) { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-bp"/></svg><strong>Blood Pressure:</strong>' + document.getElementById('sys').value + ' / ' + document.getElementById('dia').value + ' [*]</li>' + '\n'; }
												if (document.getElementById('temp').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-temp"/></svg><strong>Temperature:</strong>' + document.getElementById('temp').value + document.getElementById('fc').value + ' [*]</li>' + '\n'; }
												if (document.getElementById('peakflow').value != '') { profile = profile + '							<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-pf"/></svg><strong>Peak Flow:</strong>' + document.getElementById('peakflow').value + ' [*]</li>' + '\n'; }
	let pBody = 	'						</ul>' + '\n' +
					'						<p class="txt"><small>[*] Average Values Over Time.</small></p>' + '\n' +
					'					</fieldset>' + '\n' +
					'				</section>' + '\n';
	// Checkbox Profiler
	let section = '';
	const sections = ['allergy','cardiology','dental','dermatology','endocrinology','ENT','gastroenterology','gynecology','hepatology','nephrology','neurology','oncology','orthopedics','podiatry','psychiatry','pulmonology','rheumatology','urology','vision'];
	for (const elem of sections) {
		let i; let check = false;
		let chk = document.querySelectorAll('#' + elem + ' .check');
		for (i = 0; i < chk.length; i++) {
			if (chk[i].checked == true) { check = true } }
			if (check == true) {
				section = section + '				<section class="specialism">' + '\n';
				section = section + '					<input class="special" id="' + elem + '" name="' + elem + '" type="checkbox" value="' + elem + '">' + '\n';
				section = section + '					<label class="specs" for="' + elem + '"><svg class="svg-cat"><use xlink:href="#icon-' + elem + '"/></svg>' + elem + '</label>' + '\n';
				section = section + '					<fieldset class="category">' + '\n';
				let first = false; let fst = "first"; let sector = ""; let checkr = " checked";
				for (let i = 0; i < chk.length; i++) {
					if (chk[i].checked == true) {
						if (document.getElementById(elem + '-' + chk[i].getAttribute('name')).value != '') {
							const word = chk[i].getAttribute('name')
							const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
							section = section + '						<input class="special" id="' + elem + '-' + chk[i].getAttribute('name') + '" name="' + elem + '" type="radio" value="' + elem + '-' + chk[i].getAttribute('name') + '"' + checkr + '>' + '\n';
							section = section + '						<label class="format ' + fst + '" for="' + elem + '-' + chk[i].getAttribute('name') + '" aria-labelledby="' + chk[i].getAttribute('name') + '" title="' + capitalized + '"><svg class="svg"><use xlink:href="#icon-' + chk[i].getAttribute('name') + '"/></svg></label>' + '\n';
							if (elem + '-' + chk[i].getAttribute('name') == 'allergy-clinics') {
								section = section + '<div class="split"></div>' + '\n'; }
							sector = chk[i].getAttribute('name');
							if (first == false) { first = true; fst = ""; checkr = ""; } } } }
				section = section.replace('" for="' + elem + '-' + sector +'"',' last" for="' + elem + '-' + sector +'"');
				for (let i = 0; i < chk.length; i++) {
					if (chk[i].checked == true) {
						if (document.getElementById(elem + '-' + chk[i].getAttribute('name')).value != '') {
							section = section + '						<fieldset class="' + chk[i].getAttribute('name') + '">' + '\n'
							let markdown = 	'<ul class="list" role="list">' + '\n' +
											document.getElementById(elem + '-' + chk[i].getAttribute('name')).value + '\n' +
											'</ul>';
							// Newline Formatting - Tabs
							markdown = markdown.replace(new RegExp(/\n\n/, 'g'), '\n' + '</ul>' + '\n' + '<ul class="list" role="list">' + '\n');
							markdown = markdown.replace(new RegExp(/\n/g, 'g'), '\n' + '<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-' + chk[i].getAttribute('name') + '"/></svg>');
							// Subheadings Formatting
							let heading = '<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-' + chk[i].getAttribute('name') + '"/></svg># ';
							markdown = markdown.replace(new RegExp(heading, 'g'), '<li class="pre txt">');
							// Get Content Subroutine
							var getFromBetween = {
								results:[],
								string:"",
								getFromBetween:function (sub1,sub2) {
									if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
									var SP = this.string.indexOf(sub1)+sub1.length;
									var string1 = this.string.substr(0,SP);
									var string2 = this.string.substr(SP);
									var TP = string1.length + string2.indexOf(sub2);
									return this.string.substring(SP,TP); },
								removeFromBetween:function (sub1,sub2) {
									if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
									var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
									this.string = this.string.replace(removal,""); },
								getAllResults:function (sub1,sub2) {
									if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;
									var result = this.getFromBetween(sub1,sub2);
									this.results.push(result);
									this.removeFromBetween(sub1,sub2);
									if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
										this.getAllResults(sub1,sub2); }
									else return; },
								get:function (string,sub1,sub2) {
									this.results = [];
									this.string = string;
									this.getAllResults(sub1,sub2);
									return this.results; } };
							// Footnotes Formatting
							var footnote = getFromBetween.get(markdown,'* ','<');
							if (footnote != '') {
								for (let i = 0; i < footnote.length; i++) {
									markdown = markdown.replace('* ' + footnote[i] + '<', '</li>\n</ul>\n<p class="txt"><small>' + footnote[i] + '</small></p>\n<ul class="list" role="list">\n<');
									markdown = markdown.replace('\n</small></p>','</small></p>'); } }
							// Highlight Formatting
							var highlight = getFromBetween.get(markdown,'@','@');
							if (highlight != '') {
								for (let i = 0; i < highlight.length; i++) {
									markdown = markdown.replace('@' + highlight[i] + '@', '<mark>' + highlight[i] + '</mark>'); } }
							// Cleanup Code
							markdown = markdown.replace(new RegExp(/\n<li class/g, 'g'), '</li>\n<li class');
							markdown = markdown.replace(new RegExp('<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-' + chk[i].getAttribute('name') + '"/></svg></', 'g'), '</');
							markdown = markdown.replace(new RegExp('<li class="txt"><svg class="svg-bullet"><use xlink:href="#icon-' + chk[i].getAttribute('name') + '"/></svg><ul', 'g'), '<ul');
							markdown = markdown.replace(new RegExp('"></li>', 'g'), '">');
							markdown = markdown.replace(new RegExp(/\n<\/li>/g, 'g'), '');
							markdown = markdown.replace(new RegExp(/<\/ul><\/li>/g, 'g'), '</ul>');
							markdown = markdown.replace(new RegExp(/<ul class="list" role="list">\n<\/ul>/g, 'g'), '');
							section = section + markdown;
							section = section + '						</fieldset>' + '\n'
						}
					} }
				section = section + '					</fieldset>' + '\n'
				section = section + '				</section>' + '\n' } }
	let footer =  	'			</form>' + '\n' +
					'		</main>' + '\n' +
					'		<footer class="footer">' + '\n' +
					'			<p class="copyright">Copyright, <span class="year">2023</span></p>' + '\n' +
					'			<p class="build">Built by <a class="link" href="https://alexanderdawson.com">Alex Dawson</a>.</p>' + '\n' +
					'		</footer>' + '\n' +
					// SVG Icons
					'		<svg class="hide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '\n' +
					'			<symbol id="icon-profile" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Profile</title>' + '\n' +
					'				<path d="M14.5 19h4a.5.5 0 000-1h-4a.5.5 0 000 1zm0-6h7a.5.5 0 000-1h-7a.5.5 0 000 1zm0-3h7a.5.5 0 000-1h-7a.5.5 0 000 1zm0 6h7a.5.5 0 000-1h-7a.5.5 0 000 1zm7-15h-19A2.5 2.5 0 000 3.5v17C0 21.9 1.1 23 2.5 23h19c1.4 0 2.5-1.1 2.5-2.5v-17C24 2.1 22.9 1 21.5 1zM23 20.5c0 .8-.7 1.5-1.5 1.5h-19c-.8 0-1.5-.7-1.5-1.5V6h22v14.5zM23 5H1V3.5C1 2.7 1.7 2 2.5 2h19c.8 0 1.5.7 1.5 1.5V5zM2.5 19h10c.3 0 .5-.2.5-.5 0-1.3-.8-2.3-2-2.6l-1.6-.4v-.3c.4-.4.6-1 .8-1.5l.5-.7v-1a1 1 0 00-.3-.8v-.6c.3-.3.7-.9.1-1.7-.2-.4-.8-.9-1.9-.9-.3 0-1 0-1.7.4-2 .1-2.3 1.2-2.3 2v.8a1 1 0 00-.4.9l.1.9c0 .3.3.6.6.7.1.5.4 1 .7 1.5v.3l-1.5.4c-1.2.3-2.1 1.3-2.1 2.6a.5.5 0 00.5.5zm1.8-2.2l1.8-.4c.2 0 .3-.2.4-.4l.2-.8c0-.2 0-.4-.2-.5-.4-.4-.6-1-.7-1.5 0-.2-.2-.4-.5-.4V12a.5.5 0 00.4-.5v-1c0-.6 0-1 1.4-1l.3-.2c.4-.3 1-.3 1.2-.3.6 0 .9.1 1 .4.3.3.2.4.2.5l-.3.2-.1.3V11.8l.4.2-.1.8c-.3 0-.5.2-.5.4 0 .6-.3 1.1-.7 1.5-.2.1-.2.3-.2.5l.2.8c0 .2.2.3.4.4l1.8.4c.6.2 1 .6 1.2 1.2H3.1c.1-.6.6-1 1.2-1.2zM4.5 3a.5.5 0 100 1 .5.5 0 000-1zm2 0a.5.5 0 100 1 .5.5 0 000-1zm-4 0a.5.5 0 100 1 .5.5 0 000-1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-allergy" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Allergy Info</title>' + '\n' +
					'				<path d="M.5 24l-.4-.1a.5.5 0 010-.8l4-4a.5.5 0 01.8.8l-4 4-.4.1z"/><path d="M8.5 21h-.1l-4-1a.5.5 0 01-.4-.4l-1-4 .1-.5 11-11a.5.5 0 01.8.8L4 15.7l.8 3.4 3.4.8L19.1 9.1a.5.5 0 01.8.8l-11 11-.4.1z"/><path d="M20.5 11l-.4-.1-7-7A.5.5 0 0114 3l7 7a.5.5 0 01-.4.9zM23.5 6l-.4-.1-5-5A.5.5 0 0119 0l5 5a.5.5 0 01-.4.9z"/><path d="M17 4.5l-.4-.1a.5.5 0 010-.8l2.5-2.5a.5.5 0 01.8.8l-2.5 2.5-.4.1zM20 7.5l-.4-.1a.5.5 0 010-.8l2.5-2.5a.5.5 0 01.8.8l-2.5 2.5-.4.1zM7 16l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM10.5 12.5l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM14 9c-.1 0-.2 0-.3-.2l-1.5-1.5a.5.5 0 01.7-.7l1.5 1.5a.5.5 0 01-.4.9zM8.5 14l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM12 10.5l-.4-.1-1.5-1.5A.5.5 0 0111 8l1.5 1.5a.5.5 0 01-.4.9z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-cardiology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Cardiology</title>' + '\n' +
					'				<path d="M5.6 15.3a.5.5 0 010-1c2.5 0 8.5-4.4 8.5-5.5a.5.5 0 011 0c0 2-7 6.5-9.5 6.5z"/><path d="M18.6 11.8c-.8-.1-4.5-1-4.5-3a.5.5 0 011 0c0 .9 2.2 1.7 3.6 2a.5.5 0 010 1z"/><path d="M12.6 23.3c-2.6 0-8.5-6.4-8.5-12.5 0-2.6.8-4.5 2.3-5.6L5.5 3a1.6 1.6 0 013-1.2l1 2.2 2-.2L12 2C12 1 13 .5 13.9.8l1 .2c.7.3 1.2 1 1 1.9l-.2 1.3 1.2.4c.4-.7 1.3-1 2-.6.8.3 1.1 1.1.9 1.9l-.4 1.3.2 1.6c0 4.1-3 14.5-7 14.5zM7 1.7l-.2.1c-.3.2-.5.5-.3.8l1 2.6c0 .2 0 .5-.2.6-1.5 1-2.2 2.6-2.2 5 0 5.7 5.6 11.5 7.5 11.5 2.7 0 6-9 6-13.5 0-.5 0-1-.2-1.4V7l.4-1.4c.1-.3 0-.6-.3-.8a.6.6 0 00-.8.4v.3a.5.5 0 01-.8.2c-.5-.3-1.2-.5-2-.6a.5.5 0 01-.3-.6l.3-1.8c.1-.3 0-.6-.4-.7l-.8-.3a.6.6 0 00-.8.5l-.5 2.2c0 .3-.2.4-.5.4h-.3L9.2 5c-.2.1-.5 0-.5-.3l-1-2.6c-.2-.2-.4-.4-.7-.4z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-dental" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Dental</title>' + '\n' +
					'				<path d="M16 24c-1.1 0-1.4-1.8-1.9-5.2-.3-2-.8-5.8-1.6-5.8h-1c-.8 0-1.3 3.8-1.6 5.8C9.4 22.2 9.1 24 8 24c-.3 0-.6-.1-.9-.4-1-1-1.1-4.3-1.1-8.4v-.7c0-2-1.2-4.4-2.1-6.3C3 6.6 2.5 5.4 2.5 4.5c0-1.2 0-4.5 4-4.5 2 0 3 .7 3.7 1.3.4.4.8.7 1.3.7h1c.5 0 .9-.3 1.3-.7.8-.6 1.7-1.3 3.7-1.3 4 0 4 3.3 4 4.5 0 .9-.6 2.1-1.4 3.7-1 2-2.1 4.4-2.1 6.3v.7c0 4.1 0 7.4-1.1 8.4-.3.3-.6.4-.9.4zM6.5 1c-2.5 0-3 1.4-3 3.5 0 .7.6 2 1.3 3.3 1 2 2.2 4.5 2.2 6.7v.7c0 2.6 0 6.9.8 7.7l.2.1c.3-.3.7-2.7 1-4.4.4-3.4.8-6.6 2.5-6.6h1c1.7 0 2.1 3.2 2.6 6.6.2 1.6.5 4 1 4.4 1-1 1-5.2.9-7.8v-.7c0-2.2 1.2-4.7 2.2-6.7a11 11 0 001.3-3.3c0-2.1-.5-3.5-3-3.5-1.7 0-2.4.6-3 1.1-.6.5-1.1.9-2 .9h-1c-.9 0-1.4-.4-2-.9C9 1.6 8.2 1 6.5 1z"/><path d="M14.5 5a.5.5 0 01-.5-.5C14 3.3 15.5 2 16.5 2a.5.5 0 010 1C16 3 15 3.8 15 4.5c0 .3-.2.5-.5.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-dermatology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Dermatology</title>' + '\n' +
					'				<path d="M20.6 12.4l-3.2-3.6a5.5 5.5 0 00-3-1.7A4 4 0 0012 0a4 4 0 00-2.5 7.1c-1 .3-2 .9-2.9 1.7l-3.2 3.6c-.2.3-.4.7-.4 1.1a1.5 1.5 0 002.6 1L8 12v3.4l-2.4 2.3a2 2 0 000 2.8l3.3 3.2c.3.2.7.4 1.1.4a1.5 1.5 0 001-2.6l-1.8-1.8 1.5-1.6h2.6l1.5 1.6-1.9 1.8c-.2.3-.4.7-.4 1.1a1.5 1.5 0 002.6 1l3.3-3a2 2 0 000-3L16 15.4v-3.4l2.4 2.7c.3.2.7.4 1.1.4a1.5 1.5 0 001-2.6zM9 4a3 3 0 116 0 3 3 0 01-6 0zm-.9 15.2v.7l2.3 2.2.1.4c0 .4-.5.7-.9.3l-3.3-3a1 1 0 010-1.5L8.7 16c.7.1 1.2.6 1.3 1.3l-1.9 2zm5-2.2h-2.2c-.2-1-1-1.8-1.9-2v-1h6v1c-1 .3-1.8 1-2 2zm4.6 1.3a1 1 0 010 1.4l-3.3 3.2c-.3.2-.9 0-.9-.4l.1-.4 2.2-2.2c.2-.1.2-.5 0-.7L14 17.3c.1-.7.6-1.2 1.3-1.3l2.4 2.3zm1.8-4.3l-.3-.1-3.3-3.6a.5.5 0 00-.9.3V13H9v-2.4a.5.5 0 00-.9-.3L5 13.9c-.3.2-.9 0-.9-.4 0-.1 0-.3.2-.4l3.2-3.6c.8-1 2-1.5 3.3-1.5h2.6c1.2 0 2.5.5 3.3 1.5l3.2 3.6.2.4c0 .3-.2.5-.5.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-endocrinology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Endocrinology</title>' + '\n' +
					'				<path d="M3.5 22h-3a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5c1 0 4.5.4 5.3 1.2.2 0 .2.2.2.4-.2 2.6-2 7.9-2 8 0 .3-.3.4-.5.4zM1 21h2.1c.4-1.1 1.6-5 1.9-7.2-.7-.3-2.4-.6-4-.7v8z"/><path d="M13.4 24c-.7 0-1.2-.2-2-.5L3.7 21a.5.5 0 01.4-1l7.5 2.6c1.8.6 2 .7 6.1-1l5-2.3c-.6-.7-1.5-1-2.3-.7l-3.9 1a.5.5 0 01-.2-1l3.8-1c1.5-.4 3 .3 3.7 1.7a.5.5 0 01-.2.7l-5.5 2.5c-2.6 1-3.8 1.5-4.8 1.5z"/><path d="M14.4 20l-.7-.1-4.3-.9a.5.5 0 01.2-1l4.3.9H15l1-.3c0-.9-.5-1.3-1.6-1.6l-9-2a.5.5 0 01.2-1l9 2c1.7.5 2.4 1.3 2.4 2.9v.1c0 .3-.2.5-.4.5l-1.3.3-.9.2zM13.5 13C11 13 9 11 9 8.8c0-2.1 3.7-8 4-8.6.3-.3.7-.3 1 0 .3.7 4 6.5 4 8.6 0 2.3-2 4.2-4.5 4.2zm0-11.6A26 26 0 0010 8.8c0 1.8 1.6 3.2 3.5 3.2S17 10.6 17 8.8a26 26 0 00-3.5-7.4z"/><path d="M13.5 11A2.5 2.5 0 0111 8.5a.5.5 0 011 0c0 .8.7 1.5 1.5 1.5a.5.5 0 010 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-ENT" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>ENT</title>' + '\n' +
					'				<path d="M19 13a.5.5 0 01-.5-.5c0-.1 0-1.5.6-2.1.2-.3.6-.4.9-.4a.5.5 0 010 1h-.2c-.2.3-.3 1-.3 1.5 0 .3-.2.5-.5.5z"/><path d="M21 24c-1 0-7-1.3-8.4-2.6-1-1-.6-3.7-.3-5.6l.1-.8c-1 .2-1.6.8-2.2 1.4-.7.5-1.3 1.1-2.2 1.1C6.2 17.5.5 13.9.5 9c0-5 5-9 11-9s11 4 11 9v.2l-.4 1.2 1.3 1.8a.5.5 0 01-.2.8c-.6.2-1.7.9-1.7 1.5l.1.3c.2.2.7.2.9.2.2 0 .3 0 .4.2v.6l-.8 1.2.3.8.1.2v1.5c0 2-.3 4.5-1.5 4.5zm-7.5-9l-.2 1c-.2 1.4-.6 4 0 4.6 1 1 6.6 2.4 7.7 2.4a9 9 0 00.5-3.5v-1.4l-.4-.9v-.5l.5-.8-.7-.4c-.3-.2-.4-.6-.4-1 0-1 1-1.8 1.7-2.2l-1.1-1.5a.5.5 0 010-.5l.4-1.4c0-4.4-4.5-7.9-10-7.9s-10 3.6-10 8c0 4.5 5.4 7.5 6.5 7.5.5 0 1-.4 1.5-.9.8-.7 1.8-1.6 3.5-1.6s2.4.4 3 .7c.3.2.5.3 1 .3 1.2 0 2-1.3 2-1.3.2-.2.6-.3.8-.1.2.1.3.5.1.7 0 0-1.2 1.7-2.9 1.7-.7 0-1.2-.2-1.6-.4a4 4 0 00-2-.6z"/><path d="M22 20h-.1s-2-.5-3.9-.5c-2 0-2.5-2.5-2.5-4 0-.3.2-.5.5-.5s.5.2.5.5c0 0 0 3 1.5 3 2 0 4 .5 4.1.5a.5.5 0 01-.1 1zM14.6 12.6c-1.3 0-3-.4-3.7-.6a.5.5 0 01-.4-.6c0-.3.4-.5.6-.4 2 .5 4.1.7 4.4.4 0-.9 1-1.8 2-2.8l1-1.1c0-.2-.6-.7-1-1l-.9-.6a.5.5 0 01.8-.8l.7.7c.7.5 1.4 1 1.4 1.7 0 .5-.5 1-1.3 1.8-.7.7-1.7 1.7-1.7 2.2 0 .3-.1.6-.4.7-.3.3-.8.4-1.5.4z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-gastroenterology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Gastroenterology</title>' + '\n' +
					'				<path d="M4.8 24h-3a.5.5 0 01-.5-.6c.5-3.7 1.9-6.1 4.2-7.3 2.7-1.4 2.8-1.8 2.8-3.6V5.7A7 7 0 0111.5.1l.3-.1h3a.5.5 0 01.3.9C13.8 2 12 4 12.3 4.9c.1.4.8.6 2 .6 2.9 0 8.4 1.5 8.4 7s-5.2 9.5-8 9.5c-1.3 0-2.6-.6-4-1.1-1-.5-2-.9-3-.9-1.3 0-2.2 2.7-2.5 3.6 0 .2-.2.4-.5.4zm-2.5-1h2c.4-1.1 1.4-4 3.4-4 1.1 0 2.3.5 3.5 1 1.1.5 2.4 1 3.6 1 2 0 7-3.6 7-8.5 0-4.7-5-6-7.6-6-1.6 0-2.5-.4-2.8-1.2-.5-1.3 1-3.2 2-4.3H12c-.5.4-2.6 2-2.6 4.7v6.8c0 2.2-.4 3-3.3 4.4-2 1-3.1 3-3.7 6.1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-gynecology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Gynecology</title>' + '\n' +
					'				<path d="M12 17c-2.5 0-4.7-2-5.6-5C5.6 12 5 10.9 5 9.5c0-.4 0-.8.2-1.1C5 7.9 5 7.4 5 7a7 7 0 1113.8 1.4l.2 1.1c0 1.4-.6 2.5-1.4 2.5-1 3-3.1 5-5.6 5zm-5.2-6H7l.3.3C8 14 9.9 16 12 16s4-1.9 4.7-4.7c0-.2.2-.3.3-.4h.5c.1.1.5-.4.5-1.4l-.1-1v-.2A6 6 0 0012 1a6 6 0 00-5.8 7.3v.2c-.2.3-.2.7-.2 1 0 1 .4 1.5.5 1.5h.3z"/><path d="M23.5 24H.5a.5.5 0 01-.5-.5v-.7c0-2.8 1.8-5.3 4.4-6.2l2.5-.9c.2 0 .4 0 .6.2C8.7 17.2 10.3 18 12 18s3.3-.8 4.5-2.1c.2-.2.4-.2.6-.2l2.5 1c2.6.8 4.4 3.3 4.4 6v.8c0 .3-.2.5-.5.5zM1 23h22v-.2c0-2.4-1.5-4.5-3.7-5.2l-2.3-.8c-1.4 1.4-3.2 2.2-5 2.2s-3.6-.8-5-2.2l-2.3.8A5.5 5.5 0 001 22.8v.2zM5.7 8.9a.5.5 0 01-.2-1S9 6.5 9 3.5a.5.5 0 011 0c.2.7 4.2 4.4 8.3 4.4a.5.5 0 010 1c-3.3 0-7-2.3-8.5-4-.8 2.7-3.8 3.9-4 4h-.1zM10.5 10h-1a.5.5 0 010-1h1a.5.5 0 010 1zM14.5 10h-1a.5.5 0 010-1h1a.5.5 0 010 1z"/><path d="M8.5 15.5c-.5 0-4.2-.5-5.4-1.6a.5.5 0 010-.8C4.1 12.1 5 8.6 5 7a.5.5 0 011 0c0 1.5-.7 4.8-1.8 6.4 1 .5 3 1 4.4 1.1a.5.5 0 01-.1 1zM15.5 15.5a.5.5 0 010-1c1.2-.2 3.3-.6 4.3-1.1-1-1.6-1.8-5-1.8-6.4a.5.5 0 011 0c0 1.6.9 5.2 1.9 6.1.1.2.1.6 0 .8-1.2 1-5 1.5-5.3 1.6h-.1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-hepatology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Hepatology</title>' + '\n' +
					'				<path d="M4 23.3c-.9 0-1.9 0-2.7-.9C.4 21.5 0 20 0 17.8 0 12 2.3 4.3 6.5 4.3c.2 0 5.5-.4 7.6 1.5.6.6.9 1.2.9 2a.5.5 0 01-1 0c0-.5-.2-.9-.5-1.2C12 5.2 8 5.2 6.5 5.3 3.1 5.3 1 12.7 1 17.8c0 2 .3 3.2 1 3.9.6.6 1.4.6 2.3.6h.2c1.7 0 8.5-3 8.5-6.5a.5.5 0 011 0c0 4.5-7.7 7.5-9.5 7.5H4z"/><path d="M13.5 17.3a.5.5 0 010-1c4.6 0 9.5-3.6 9.5-5.5v-.3c0-1 0-2-1.7-2.8-.8-.3-5.1-1-7.9-1.4a.5.5 0 01.2-1c.7 0 7 1 8 1.5 2.4 1 2.4 2.7 2.4 3.8v.2c0 2.6-5.5 6.5-10.5 6.5z"/><path d="M15.8 22c-.5 0-1-.3-1.2-.7l-2-2.7a.5.5 0 11.8-.6l2 2.7c.1.3.4.3.6.2l.8-.5.2-.3v-.4l-2-2.6a.5.5 0 11.9-.6l1.9 2.6a1.5 1.5 0 01-.5 2.2l-.8.4c-.2.2-.5.3-.7.3zM15.5 6.3a.5.5 0 01-.5-.5v-1l.1-.4 1.3-1.3c.2-.2.2-.5 0-.7L16 2a.5.5 0 00-.8 0L14 3c-.2.2-.3.2-.5.2a.5.5 0 01-.3-.3l-.5-1-.3-.2-.5.1-.2.2c-.3.2-.3.5-.2.7l.5.7.1.3v1a.5.5 0 01-1 0v-.9l-.4-.5c-.4-.7-.3-1.6.4-2l.2-.3a1.5 1.5 0 012.3.5l.1.3.8-.8c.6-.5 1.6-.5 2.2 0l.5.6c.6.6.6 1.6 0 2.2L16 5v.8c0 .3-.2.5-.5.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-nephrology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Nephrology</title>' + '\n' +
					'				<path d="M4 14C2 14 .5 12.4.5 10.5.5 6.4 3.9 3 8 3a3.5 3.5 0 11-.5 7v.5c0 2-1.6 3.5-3.5 3.5zM8 4c-3.6 0-6.5 3-6.5 6.5a2.5 2.5 0 005 0c0-.4 0-.7-.3-1.1a.5.5 0 01.7-.7c.4.2.7.3 1.1.3a2.5 2.5 0 000-5zM20 14a3.5 3.5 0 01-3.5-4H16a3.5 3.5 0 010-7c4.1 0 7.5 3.4 7.5 7.5 0 2-1.6 3.5-3.5 3.5zm-2.7-5.3a.5.5 0 01.5.7c-.2.4-.3.7-.3 1.1a2.5 2.5 0 005 0c0-3.6-3-6.5-6.5-6.5a2.5 2.5 0 000 5c.4 0 .7 0 1.1-.3h.2z"/><path d="M12 21a.5.5 0 01-.5-.5v-6c0-2-3.4-4-4.7-4.5a.5.5 0 01.4-1c.2.1 5.3 2.4 5.3 5.5v6c0 .3-.2.5-.5.5z"/><path d="M12 15a.5.5 0 01-.5-.5c0-3 5-5.4 5.3-5.5a.5.5 0 11.4 1c-1.3.5-4.7 2.5-4.7 4.5 0 .3-.2.5-.5.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-neurology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Neurology</title>' + '\n' +
					'				<path d="M8 14.5c-.9 0-2.4-.1-3.3-1a2 2 0 01-.7-1c-1 0-2-.4-2.4-1-.4-.4-.5-.8-.6-1.1-.7-.3-1-1.4-1-2 0 0 0-3.9 5.3-5.9 4.9-1.8 10.2-1 12.4 1 2.4.1 4 2.3 4.2 4.3.2 1.8-.8 4-4.1 4.6-1.2 1.4-3.6 1.5-5.8 1.6-1.4 0-2.6 0-3.3.4h-.2l-.5.1zm-1-4.3c-.6 0-1.1.1-1.5.4-.3.3-.5.8-.5 1.4 0 .3.1.6.4.8.7.7 2.3.7 3 .7.8-.4 2-.5 3.6-.5 2-.1 4.3-.2 5-1.3l.4-.2c2.4-.4 3.7-1.7 3.5-3.6-.1-1.6-1.5-3.4-3.4-3.4-.1 0-.3 0-.4-.2-1.8-1.8-6.9-2.6-11.4-.8C1 5.2 1 8.5 1 8.5c0 .2.1 1 .5 1a.5.5 0 01.5.5s0 .5.3.8c.3.4 1 .6 1.7.7.1-.7.4-1.3.8-1.6 1.2-1 3-.7 4-.5h.7a.5.5 0 010 1h-.8L7 10.2z"/><path d="M14.5 22.5h-3a.5.5 0 01-.5-.4l-1-5.6a4.9 4.9 0 01-3.1-2c-.1 0-.2 0-.3-.2a.5.5 0 01.8-.7l.2.3c.5.6 1.4 1.6 2.9 1.6.2 0 .5.2.5.4l1 5.6h2l-.5-2.4a.5.5 0 111-.2l.5 3a.5.5 0 01-.5.6z"/><path d="M16.5 19.5c-2.6 0-4.5-1-4.5-2.5s2-2.5 4.5-2.5 4.5 1 4.5 2.5-2 2.5-4.5 2.5zm0-4c-2 0-3.5.8-3.5 1.5s1.5 1.5 3.5 1.5S20 17.7 20 17s-1.5-1.5-3.5-1.5z"/><path d="M20.5 16.5a.5.5 0 010-1c1.3 0 2.5-.8 2.5-1.5v-.2c-.3-.2-1-.3-1.4-.3-.3 0-.6-.2-.6-.5s.2-.5.5-.5c1.1 0 1.4-.6 1.4-1 .3-1.6-1-3.9-1.4-4-.3 0-.5-.2-.5-.5s.2-.5.5-.5c1.1 0 2.5 2.8 2.5 4.5a2.5 2.5 0 01-.7 1.9l.3.2c.3.3.4.6.4.9 0 1.3-1.6 2.5-3.5 2.5zM11.5 7.5a.5.5 0 01-.4-.8c.1-.1 2.5-3.2 6.4-3.2a.5.5 0 010 1 7.8 7.8 0 00-5.6 2.8l-.4.2zM17.5 12.5c-2 0-2.5-2.3-2.5-3.5 0-.3.2-.5.5-.5s.5.2.5.5c0 0 0 2.5 1.5 2.5a.5.5 0 010 1zM18.5 9.5A.5.5 0 0118 9c0-1-1-1.5-1.5-1.5a.5.5 0 010-1c1 0 2.5.9 2.5 2.5 0 .3-.2.5-.5.5zM11.5 11.5a.5.5 0 010-1c.4 0 1.5-.7 1.5-1.5a.5.5 0 011 0c0 1.4-1.5 2.5-2.5 2.5zM4.5 7.5h-.3C3.3 6.8 3.1 6.1 3 5.6 3 5 3.3 4 4.2 3.1a.5.5 0 01.6.8C4.3 4.4 4 5 4 5.6c0 .4.3.7.8 1a.5.5 0 01-.3.9zM6.5 7.5a.5.5 0 010-1C8.2 6.5 9 4.5 9 4a.5.5 0 011 0c0 .8-1 3.5-3.5 3.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-oncology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Oncology</title>' + '\n' +
					'				<path d="M7 22A7 7 0 017 8c1.6-.3 4.2-1 4.6-1.7l.5-1C13 3 15 2 17.5 2a6.5 6.5 0 010 13c-1.6 0-3.3 1.8-4.1 2.9A7 7 0 017 22zM17.5 3c-2.2 0-3.6.9-4.6 2.7l-.4 1C11.7 8.2 7.8 8.9 7 9 3.7 9 1 11.7 1 15a6 6 0 0011.5 2.3c1.2-1.5 3-3.3 5-3.3a5.5 5.5 0 000-11z"/><path d="M7 20a5 5 0 01-2.2-.5.5.5 0 11.5-.9A4 4 0 007 19c.3 0 .5.2.5.5s-.2.5-.4.5zm2-.5a.5.5 0 01-.2-1 4 4 0 001.4-1c.1-.3.5-.3.7-.2.2.2.2.5 0 .7-.4.6-1 1.1-1.7 1.5H9zm-5.5-1.2c-.2 0-.3 0-.4-.2a5 5 0 01-1-2 .5.5 0 011-.2c.1.6.4 1.1.8 1.6a.5.5 0 01-.4.8zm8.2-1.8a.5.5 0 01-.4-.8c.4-.6 1-1 1.4-1.5.2-.2.5-.2.7 0 .2.2.2.5 0 .7L12 16.4l-.3.1zm-9-2h-.2a.5.5 0 01-.4-.6 5 5 0 011-2 .5.5 0 11.8.6A4 4 0 003 14c0 .2-.3.4-.5.4zm12-.7a.5.5 0 01-.3-.9c.7-.4 1.4-.7 2-.8a.5.5 0 11.2 1c-.5.1-1.1.3-1.7.7h-.3zm3.8-1a.5.5 0 01-.1-1c.6 0 1.1-.4 1.5-.8a.5.5 0 01.7.7 4.5 4.5 0 01-2 1.2zM5.1 11.5a.5.5 0 01-.2-1A5 5 0 017 10c.3 0 .5.2.5.5s-.2.5-.5.5a4 4 0 00-1.7.4H5zm4-.8a.5.5 0 01-.1-1l1.8-.5c.2-.1.5 0 .6.3s0 .5-.3.6a15.3 15.3 0 01-2 .6zm12.2-.4h-.1a.5.5 0 01-.4-.7 3.5 3.5 0 00.1-1.7c0-.3.1-.6.4-.6.3 0 .5.1.6.4a4.5 4.5 0 01-.1 2.2c0 .2-.3.4-.5.4zM12.7 9a.5.5 0 01-.3-1 3 3 0 001-1V7l.1-.2a.5.5 0 011 .4l-.2.2v.1A4 4 0 0113 9h-.3zm7.8-2.7c-.1 0-.3 0-.4-.2-.3-.4-.8-.8-1.4-1a.5.5 0 11.3-1c.8.3 1.4.8 1.9 1.4a.5.5 0 01-.4.8zm-5.4-.6a.5.5 0 01-.4-.8c.6-.6 1.2-.9 2.1-1a.5.5 0 01.1 1c-.6.1-1.1.3-1.5.7l-.3.1zM7 17a2 2 0 110-4 2 2 0 010 4zm0-3a1 1 0 100 2 1 1 0 000-2zM17.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0-2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-podiatry" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Podiatry</title>' + '\n' +
					'				<path d="M15.5 23h-4.3c-.6 0-1.1-.2-1.6-.6-.2-.3-.5-.4-.8-.4H6v.5c0 .3-.2.5-.5.5h-4C.7 23 0 22.3 0 21.5v-2c0-.3.2-.5.5-.5h4c.7 0 1.4 0 2.2.2l3.3.6 2 .2h2.7c2.1 0 4.2-.4 6.2-1l2.4-1a.5.5 0 01.7.5v2l-.1.4a18.3 18.3 0 01-8.3 2.1zm-10-2h3.3c.6 0 1.1.2 1.6.6.2.3.5.4.8.4h4.3a17.3 17.3 0 007.5-1.7v-1l-1.8.6c-2 .7-4.2 1.1-6.4 1.1H12c-.8 0-1.5 0-2.3-.2l-3.3-.6-2-.2H1v1.5c0 .3.2.5.5.5H5v-.5c0-.3.2-.5.5-.5z"/><path d="M23 19l-.4-.1a.5.5 0 010-.8c.2 0 .4-.5.4-1.6 0-.6-.6-1-1.5-1-.6 0-1.1.1-1.6.3l-1.4.2a6 6 0 01-2.2-.5.5.5 0 11.4-1s1 .5 1.8.5c.4 0 .7 0 1.1-.2.5-.1 1.1-.3 1.9-.3 1.6 0 2.5 1 2.5 2 0 1.1-.2 2-.6 2.4l-.4.1z"/><path d="M14.5 21h-.2a.5.5 0 01-.2-.8c.5-.9 1.9-3.6 1.9-4.7 0-.6-1.5-1.3-2.6-2-1-.5-2.1-1-2.8-1.6-1.3-1.4-.9-7.4-.7-9.8-1.3.3-4.4.9-5.4.9H2c.1 2 .4 8 0 9.2-.5 1.2-1 3.2-1 4.3V19h1.5a.5.5 0 010 1h-2a.5.5 0 01-.5-.5v-3c0-1.6.9-4.2 1-4.7a61.2 61.2 0 00.1-9.6l.4-.2h3a57.4 57.4 0 006.3-.9c.2.1.2.3.2.5-.4 3.4-.5 8.7.4 9.5.5.6 1.5 1 2.4 1.6 1.7.8 3.2 1.6 3.2 2.8a16 16 0 01-2 5.3l-.5.2z"/><path d="M7.5 20a.5.5 0 01-.5-.5C7 16 2.2 13 1.5 13a.5.5 0 01-.5-.5c0-.3.2-.5.5-.5C2.7 12 8 15.5 8 19.5c0 .3-.2.5-.5.5zM10 5H8.5a.5.5 0 110-1H10a.5.5 0 010 1zM10 7H8.5a.5.5 0 110-1H10a.5.5 0 010 1zM10 9H8.5a.5.5 0 110-1H10a.5.5 0 010 1zM9 11.5a.5.5 0 01-.2-1l1.5-.5c.3 0 .6 0 .7.3 0 .3 0 .6-.3.7l-1.5.5H9zM10 13.5l-.4-.1a.5.5 0 010-.8l1-1a.5.5 0 01.8.8l-1 1-.4.1zM12 15h-.2a.5.5 0 01-.3-.7l.5-1.5c.1-.2.4-.4.7-.3.2.1.4.4.3.7l-.5 1.5c-.1.2-.3.3-.5.3zM14 16h-.2a.5.5 0 01-.3-.7l.5-1.5c.1-.2.4-.4.7-.3.2.1.4.4.3.7l-.5 1.5c-.1.2-.3.3-.5.3z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-psychiatry" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Psychiatry</title>' + '\n' +
					'				<path d="M22.5 14.5c0-.7-1.5-3.3-2.2-4.6l.2-2.4C20.5 5.3 17.7 0 11 0 4.4 0 1.5 5 1.5 8.5c0 2.5 1.5 5 2.7 7a9 9 0 011.3 3c0 1.3-2 3.8-2.9 4.6a.5.5 0 10.8.7c.3-.3 3.1-3.4 3.1-5.3 0-.9-.7-2-1.5-3.4-1.1-2-2.5-4.4-2.5-6.6C2.5 6 4.5 1 11 1c6.4 0 8.5 5.1 8.5 6.5 0 1.5-.2 2.4-.2 2.4v.3c1 1.8 2.2 3.9 2.2 4.3 0 .1-.6.4-1.1.5a.5.5 0 00-.4.6l.4 1.2-.3.3v.5l-.3.1a1 1 0 00-.3.8c0 .4.2.6.3.8.1.2.2.3.2.7 0 .4-.1.7-2 1-1.4.2-4.5 1.3-4.5 2.5 0 .3.2.5.5.5s.5-.2.5-.4c.2-.4 2-1.4 3.6-1.6 1.2-.2 2.9-.5 2.9-2 0-.7-.2-1-.4-1.2 0-.2-.1-.2-.2-.3.3 0 .6-.2.6-.5v-.2l.4-.5v-.5l-.3-1c.6-.2 1.4-.6 1.4-1.3zM11.5 7a2 2 0 100 4 2 2 0 000-4zm0 3a1 1 0 110-2 1 1 0 010 2zm3 2.6c.4.1.7 0 .9-.3l.9-1.6c.2-.3 0-.7-.2-1l-.7-.5a5 5 0 000-.4l.7-.6c.3-.2.4-.6.2-1l-1-1.5a.7.7 0 00-.8-.3l-.9.3-.3-.2-.2-1c0-.3-.3-.5-.7-.5h-1.8c-.4 0-.7.3-.7.6l-.1 1-.4.1-1-.3a.7.7 0 00-.8.3l-.9 1.6c-.2.3 0 .6.2.9l.7.6a3.2 3.2 0 000 .4l-.7.6c-.3.2-.4.6-.2.9l1 1.6c.1.3.5.4.8.3l.9-.4.3.2.2 1c0 .3.3.6.7.6h1.8c.4 0 .7-.3.7-.6l.2-1s.2 0 .3-.2l1 .4zm-1.2-1.3l-.7.3c-.2.1-.3.3-.3.4l-.1 1h-1.4l-.1-1-.3-.4c-.3 0-.5-.2-.6-.3a.5.5 0 00-.5-.1l-1 .4-.6-1.2.8-.6.2-.5V9v-.4c0-.2 0-.3-.2-.5l-.8-.6.7-1.1.9.4.5-.1.6-.4c.2 0 .3-.2.3-.4l.1-1h1.4l.1 1c0 .2.1.3.3.4l.7.4c.1.1.3.1.4 0l1-.3.6 1.1-.8.6c-.1.2-.2.3-.1.5a3.4 3.4 0 010 .8l.1.4.8.6-.7 1.2-.9-.4h-.4z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-pulmonology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Pulmonology</title>' + '\n' +
					'				<path d="M2.5 24C1.1 24 0 21.5 0 18.5 0 12.8 3.4 4 7.5 4 8.8 4 9 6.4 9 7.5V20c0 .3-.2.5-.5.5-4.3 0-5.5 3.1-5.5 3.2-.1.2-.3.3-.5.3zm5-19C4.3 5 1 12.9 1 18.5c0 2.4.7 4 1.2 4.4.6-1 2.2-3.2 5.8-3.4v-12c0-1.1-.3-2.4-.5-2.5zM21.5 24a.5.5 0 01-.5-.3c0-.2-1.2-3.2-5.5-3.2a.5.5 0 01-.5-.5V7.5c0-1 .2-3.5 1.5-3.5 4.1 0 7.5 8.8 7.5 14.5 0 3-1.1 5.5-2.5 5.5zM16 19.5c3.6.2 5.2 2.4 5.8 3.4.5-.5 1.2-2 1.2-4.4C23 12.9 19.7 5 16.5 5c-.2.1-.5 1.4-.5 2.5v12z"/><path d="M15.5 11A2.5 2.5 0 0113 8.5V1h-2v7.5C11 9.9 9.9 11 8.5 11a.5.5 0 010-1c.8 0 1.5-.7 1.5-1.5v-8c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v8c0 .8.7 1.5 1.5 1.5a.5.5 0 010 1z"/><path d="M15.5 14h-1c-1 0-2-.5-2.5-1.3A3 3 0 019.5 14h-1a.5.5 0 010-1h1a2 2 0 002-2 .5.5 0 011 0c0 1.1.9 2 2 2h1a.5.5 0 010 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-rheumatology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Rheumatology</title>' + '\n' +
					'				<path d="M10 8a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/><path d="M10 11a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm0-10a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/><path d="M5 24c-.2 0-.3 0-.4-.2-1.4-2.5-2.1-4.4-2.1-6.3 0-1 .4-2.2.9-3.5.5-1.4 1.1-3 1.1-4.5a.5.5 0 011 0c0 1.6-.6 3.3-1.2 4.9-.4 1.2-.8 2.3-.8 3.1 0 1.6.6 3.3 1.7 5.4 1-.3 1.4-.2 2-.1.7 0 1.6.2 3.8.2a28 28 0 005.6-.5c1.3-.3 2.6-.5 4.4-.5a.5.5 0 010 1c-1.7 0-3 .2-4.2.4-1.5.3-3.1.6-5.8.6a23 23 0 01-3.9-.2c-.6-.1-.8-.2-2 .2H5z"/><path d="M8 18l-.4-.1a.5.5 0 010-.8h.1c1-1.2.7-4 0-4.7a.5.5 0 01.7-.8c.7.8 1 2.6.8 4.2a5.3 5.3 0 015.7 0c.5-.5 1.6-1.5 3.2-1.7 1-.2 2.2.2 3.2 1a.5.5 0 01-.6.8c-.8-.7-1.7-1-2.5-.8-1.6.2-2.8 1.7-2.8 1.7-.2.2-.5.3-.7.1-3-2-5.3-.2-6.2.8l-.1.2-.4.1zM10 6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5a.5.5 0 010 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-urology" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Urology</title>' + '\n' +
					'				<path d="M13.5 20h-8A2.5 2.5 0 013 17.5v-12C3 4.1 4.1 3 5.5 3h8C14.9 3 16 4.1 16 5.5v12c0 1.4-1.1 2.5-2.5 2.5zm-8-16C4.7 4 4 4.7 4 5.5v12c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5v-12c0-.8-.7-1.5-1.5-1.5h-8z"/><path d="M14 4H5a.5.5 0 01-.3-1l4.5-3h.6l4.4 3a.5.5 0 01-.2 1zM6.7 3h5.6L9.5 1.1 6.7 3zM11.4 18H7.6A2.6 2.6 0 015 15.4v-4.8C5 9.2 6.2 8 7.6 8h3.8c1.4 0 2.6 1.2 2.6 2.6v4.8c0 1.4-1.2 2.6-2.6 2.6zM7.6 9C6.7 9 6 9.7 6 10.6v4.8c0 .9.7 1.6 1.6 1.6h3.8c.9 0 1.6-.7 1.6-1.6v-4.8c0-.9-.7-1.6-1.6-1.6H7.6zM6.5 8h-1a.5.5 0 110-1h1a.5.5 0 010 1z"/><path d="M6.5 10h-1a.5.5 0 110-1h1a.5.5 0 010 1zM6.5 12h-1a.5.5 0 110-1h1a.5.5 0 010 1zM6.5 14h-1a.5.5 0 110-1h1a.5.5 0 010 1zM6.5 16h-1a.5.5 0 110-1h1a.5.5 0 010 1zM6.5 18h-1a.5.5 0 110-1h1a.5.5 0 010 1zM10.5 22h-2a.5.5 0 01-.5-.5v-2c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5zM9 21h1v-1H9v1z"/><path d="M12.5 24c-3 0-3.5-1.6-3.5-2.5a.5.5 0 011 0c0 .4 0 1.5 2.5 1.5 1.3 0 3.5-.2 3.5-1.5 0-1.1.8-2.5 4.5-2.5a.5.5 0 010 1c-1.3 0-3.5.2-3.5 1.5 0 1.1-.8 2.5-4.5 2.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-vision" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Vision</title>' + '\n' +
					'				<path d="M7 21H4a4 4 0 010-8h3a4 4 0 010 8zm-3-7a3 3 0 000 6h3a3 3 0 000-6H4zm16 7h-3a4 4 0 010-8h3a4 4 0 010 8zm-3-7a3 3 0 000 6h3a3 3 0 000-6h-3z"/><path d="M13.5 17.5l-.3-.1a2 2 0 00-2.4 0c-.2.2-.5.1-.7-.1a.5.5 0 01.1-.7 3 3 0 013.6 0 .5.5 0 01-.3.9zM.7 16.3H.6a.5.5 0 01-.3-.7L4 5.2a2 2 0 013-.9.5.5 0 01-.6.9 1 1 0 00-1.5.4L1.2 16c0 .2-.3.4-.5.4zm22.6 0a.5.5 0 01-.5-.4L19 5.6a1 1 0 00-1.5-.4c-.2.1-.6 0-.7-.2-.2-.2-.1-.5.1-.7a2 2 0 013 1l3.8 10.3a.5.5 0 01-.4.7z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'		</svg>' + '\n' +
					'		<svg class="hide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '\n' +
					'			<symbol id="icon-dob" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Date Of Birth</title>' + '\n' +
					'				<path d="M5.5 6C4.7 6 4 5.3 4 4.5v-2a1.5 1.5 0 013 0v2C7 5.3 6.3 6 5.5 6zm0-4c-.3 0-.5.2-.5.5v2a.5.5 0 001 0v-2c0-.3-.2-.5-.5-.5zm12 4c-.8 0-1.5-.7-1.5-1.5v-2a1.5 1.5 0 013 0v2c0 .8-.7 1.5-1.5 1.5zm0-4c-.3 0-.5.2-.5.5v2a.5.5 0 001 0v-2c0-.3-.2-.5-.5-.5z"/><path d="M22.5 9H.5a.5.5 0 01-.5-.5v-2C0 4.5 1.6 3 3.5 3h1c.3 0 .5.2.5.5v1a.5.5 0 001 0v-1c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v1a.5.5 0 001 0v-1c0-.3.2-.5.5-.5h1c2 0 3.5 1.6 3.5 3.5v2c0 .3-.2.5-.5.5zM1 8h21V6.5C22 5.1 20.9 4 19.5 4H19v.5a1.5 1.5 0 01-3 0V4H7v.5a1.5 1.5 0 01-3 0V4h-.5A2.5 2.5 0 001 6.5V8z"/><path d="M19.5 24h-16c-2 0-3.5-1.6-3.5-3.5v-12c0-.3.2-.5.5-.5h22c.3 0 .5.2.5.5v12c0 2-1.6 3.5-3.5 3.5zM1 9v11.5C1 21.9 2.1 23 3.5 23h16c1.4 0 2.5-1.1 2.5-2.5V9H1z"/><path d="M15.5 22h-8c-.8 0-1.5-.7-1.5-1.5v-2a.5.5 0 011 0v2c0 .3.2.5.5.5h8c.3 0 .5-.2.5-.5v-2a.5.5 0 011 0v2c0 .8-.7 1.5-1.5 1.5z"/><path d="M11.5 19c-.8 0-1.5-.4-2-1l-.4.4c-.5.5-1.3.7-2 .6-1.2-.2-2.1-1.3-2.1-2.6S6 14 7.4 14h8.2c1.3 0 2.4 1 2.4 2.4 0 1.3-.9 2.4-2 2.6a2.5 2.5 0 01-2.5-1c-.5.6-1.2 1-2 1zm-4.1-4c-.8 0-1.4.6-1.4 1.4 0 .8.5 1.5 1.2 1.6.5 0 1 0 1.3-.4.3-.2.5-.7.5-1.1a.5.5 0 011 0 1.5 1.5 0 003 0 .5.5 0 011 0 1.5 1.5 0 001.8 1.5c.7-.1 1.2-.8 1.2-1.6s-.6-1.4-1.4-1.4H7.4z"/><path d="M11.5 15a.5.5 0 01-.5-.5V12a.5.5 0 011 0v2.5c0 .3-.2.5-.5.5z"/><path d="M11.5 12.5a1 1 0 01-1-1c0-.4.3-.9.6-1.3.2-.3.6-.3.8 0 .3.4.6 1 .6 1.3 0 .6-.4 1-1 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-hid" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Healthcare ID</title>' + '\n' +
					'				<path d="M12 2a.5.5 0 100 1 .5.5 0 000-1zm7 1h-4.5v-.5a2.5 2.5 0 00-5 0V3H5c-.8 0-1.5.7-1.5 1.5v18c0 .8.7 1.5 1.5 1.5h14c.8 0 1.5-.7 1.5-1.5v-18c0-.8-.7-1.5-1.5-1.5zm-8.5-.5a1.5 1.5 0 013 0V5h-3V2.5zm9 20c0 .3-.2.5-.5.5H5a.5.5 0 01-.5-.5v-18c0-.3.2-.5.5-.5h4.5v1H9a.5.5 0 000 1h6a.5.5 0 000-1h-.5V4H19c.3 0 .5.2.5.5v18zM16 19H8a.5.5 0 000 1h8a.5.5 0 000-1zm-2 2h-4a.5.5 0 000 1h4a.5.5 0 000-1zm1.4-6.1l-1.5-.4v-.3c.4-.4.6-1 .8-1.5l.5-.7v-1a1 1 0 00-.3-.8v-.6c.3-.3.7-.9.1-1.7-.2-.4-.8-.9-1.9-.9-.3 0-1 0-1.7.4-2 .1-2.3 1.2-2.3 2v.8a1 1 0 00-.4.9l.1.9c0 .3.3.6.6.7.1.5.4 1 .7 1.5v.3l-1.5.4c-1.3.3-2.1 1.3-2.1 2.6a.5.5 0 00.5.5h10c.3 0 .5-.2.5-.5 0-1.3-.9-2.3-2-2.6zM7.6 17c.1-.6.6-1 1.2-1.2l1.8-.4c.2 0 .3-.2.4-.4l.2-.8c0-.2 0-.4-.2-.5-.4-.4-.6-1-.7-1.5 0-.2-.2-.4-.5-.4V11a.5.5 0 00.4-.5v-1c0-.6 0-1 1.4-1l.3-.2c.4-.3 1-.3 1.2-.3.8 0 1 .3 1 .4.3.3.2.4.2.5L14 9l-.1.3V11h.4l-.1.9c-.3 0-.5.2-.5.4 0 .6-.3 1.1-.7 1.5-.2.1-.2.3-.2.5l.2.8c0 .2.2.3.4.4l1.8.4c.6.2 1 .6 1.2 1.2H7.6z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-iid" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Insurance ID</title>' + '\n' +
					'				<path d="M14.5 11h3a.5.5 0 000-1h-3a.5.5 0 000 1zm5 0h2a.5.5 0 000-1h-2a.5.5 0 000 1zm2 5h-4a.5.5 0 000 1h4a.5.5 0 000-1zm-7 1h1a.5.5 0 000-1h-1a.5.5 0 000 1zm-12 2h10c.3 0 .5-.2.5-.5 0-1.3-.8-2.3-2-2.6l-1.4-.4c1-.2 1.4-.5 1.4-.5.2 0 .2-.2.3-.4l-.2-.4s-.7-.6-.7-2.7c0-2-.5-3-1.6-3C8.5 8 8 8 7.5 8c-1 0-2.9.9-2.9 3.5 0 2-.7 2.7-.7 2.7a.5.5 0 000 .8l1.5.5-1.3.4c-1.3.3-2.1 1.3-2.1 2.6a.5.5 0 00.5.5zm1.8-2.2l1.8-.4c.2 0 .3-.2.4-.4l.1-.7a.5.5 0 00-.4-.6L5 14.4c.3-.5.6-1.4.6-2.9 0-2 1.6-2.5 1.9-2.5.4 0 .5 0 .7.3l.4.1h.2c.3 0 .6.7.6 2.1 0 1.5.3 2.4.6 2.9l-1.2.3a.5.5 0 00-.4.6l.1.7c0 .2.2.3.4.4l1.8.4c.6.2 1 .6 1.2 1.2H3.1c.1-.6.6-1 1.2-1.2zM21.5 3h-19A2.5 2.5 0 000 5.5v13C0 19.9 1.1 21 2.5 21h19c1.4 0 2.5-1.1 2.5-2.5v-13C24 4.1 22.9 3 21.5 3zM23 18.5c0 .8-.7 1.5-1.5 1.5h-19c-.8 0-1.5-.7-1.5-1.5V7h22v11.5zM23 6H1v-.5C1 4.7 1.7 4 2.5 4h19c.8 0 1.5.7 1.5 1.5V6zm-8.5 8h7a.5.5 0 000-1h-7a.5.5 0 000 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-blood" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Blood Type</title>' + '\n' +
					'				<path d="M3.5 22l-.4-.1-3-3a.5.5 0 01.4-.9l2.7.2c3.3.5 7.9 1 11-2 2.8-3 2.5-6.3 2.1-10.4C16.2 4 16 2.4 16 .5a.5.5 0 01.9-.4l5 5a.5.5 0 01-.8.8l-4-4.2.2 4c.4 4.2.8 8-2.4 11.2-3.5 3.4-8.3 2.8-11.9 2.3l-1.2-.1 2 2a.5.5 0 01-.3.9z"/><path d="M5.5 24a.5.5 0 01-.5-.5L4.8 21C4.3 17.4 3.8 12.6 7 9c3.3-3.2 7-2.8 11.2-2.4 1.7.1 3.4.3 5.2.3a.5.5 0 010 1c-1.9 0-3.6-.2-5.3-.3C14.1 7.3 10.7 7 8 9.9c-3.1 3-2.6 7.6-2.1 11l.2 2.6c0 .3-.2.5-.5.5z"/><path d="M12 18.5l-.4-.1-4.5-4.5A.5.5 0 018 13l4.5 4.5a.5.5 0 01-.4.9zM14.5 17l-.4-.1-5.5-5.5a.5.5 0 01.8-.8l5.5 5.5a.5.5 0 01-.4.9zM16 14.5l-.4-.1-4.5-4.5A.5.5 0 0112 9l4.5 4.5a.5.5 0 01-.4.9zM17 11.5l-.4-.1-2.5-2.5A.5.5 0 0115 8l2.5 2.5a.5.5 0 01-.4.9zM9 19.5l-.4-.1-2.5-2.5A.5.5 0 017 16l2.5 2.5a.5.5 0 01-.4.9zM18.5 6l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-organ" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Organ Donor</title>' + '\n' +
					'				<path d="M21.5 8H16V2.5c0-.8-.7-1.5-1.5-1.5h-5C8.7 1 8 1.7 8 2.5V8H2.5C1.7 8 1 8.7 1 9.5v5c0 .8.7 1.5 1.5 1.5H8v5.5c0 .8.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5V16h5.5c.8 0 1.5-.7 1.5-1.5v-5c0-.8-.7-1.5-1.5-1.5zm.5 6.5c0 .3-.2.5-.5.5h-6c-.3 0-.5.2-.5.5v6c0 .3-.2.5-.5.5h-5a.5.5 0 01-.5-.5v-6c0-.3-.2-.5-.5-.5h-6a.5.5 0 01-.5-.5v-5c0-.3.2-.5.5-.5h6c.3 0 .5-.2.5-.5v-6c0-.3.2-.5.5-.5h5c.3 0 .5.2.5.5v6c0 .3.2.5.5.5h6c.3 0 .5.2.5.5v5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-diabetic" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Diabetes</title>' + '\n' +
					'				<path d="M22.5 6.5v-.2l-.2-.2-10-6a.5.5 0 00-.6 0l-10 6-.1.1v.3h-.1v11c0 .2 0 .3.2.4l10 6 .3.1h.2l10-6c.2-.2.3-.3.3-.5v-11zm-11 16.1l-9-5.4V7.4l9 5.4v9.8zM12 12L3 6.5l9-5.4 9 5.4-9 5.4zm9.5 5.3l-9 5.4v-9.8l9-5.4v9.8z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-height" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Height</title>' + '\n' +
					'				<path d="M4.5 24l-.4-.1-4-4a.5.5 0 010-.8l19-19c.2-.1.6-.1.8 0l4 4c.1.2.1.6 0 .8l-19 19-.4.1zm-3.3-4.5l3.3 3.3L22.8 4.5l-3.3-3.3L1.2 19.5z"/><path d="M2.5 19l-.4-.1-.5-.5a.5.5 0 01.8-.8l.5.5a.5.5 0 01-.4.9zM5.5 18l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM6.5 15l-.4-.1-.5-.5a.5.5 0 01.8-.8l.5.5a.5.5 0 01-.4.9zM9.5 14l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM10.5 11l-.4-.1-.5-.5a.5.5 0 01.8-.8l.5.5a.5.5 0 01-.4.9zM13.5 10l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM14.5 7l-.4-.1-.5-.5a.5.5 0 01.8-.8l.5.5a.5.5 0 01-.4.9zM17.5 6l-.4-.1-1.5-1.5a.5.5 0 01.8-.8l1.5 1.5a.5.5 0 01-.4.9zM18.5 3l-.4-.1-.5-.5a.5.5 0 01.8-.8l.5.5a.5.5 0 01-.4.9z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-weight" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Weight</title>' + '\n' +
					'				<path d="M12 23.2C7.7 23.2.5 21.5.5 19.7l.1-.5L4.5 7.6c0-.4.4-1 5.3-1.3.3 0 .5.1.5.4 0 .3-.2.5-.4.6-2.3.1-4 .4-4.4.6l-4 11.7c.3.7 5.4 2.6 10.5 2.6s10.2-1.9 10.5-2.6L18.5 8c-.4-.2-2.1-.5-4.4-.6a.5.5 0 01-.4-.6c0-.3.2-.5.5-.4 5 .3 5.3 1 5.3 1.3l4 11.7v.4c0 1.8-7.2 3.5-11.5 3.5z"/><path d="M12 8.2a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm0-6a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM9 18.2a.5.5 0 01-.5-.5v-4a.5.5 0 011 0v4c0 .3-.2.5-.5.5z"/><path d="M9 17.2a.5.5 0 01-.2-1l2-1a.5.5 0 11.4 1l-2 1H9z"/><path d="M11 18.2c-.2 0-.3 0-.4-.2l-1-1.5a.5.5 0 11.8-.6l1 1.5a.5.5 0 01-.4.8zM14 18.2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0-2a.5.5 0 100 1 .5.5 0 000-1z"/><path d="M14 20.2c-.8 0-1.5-.7-1.5-1.5a.5.5 0 011 0 .5.5 0 001 0v-3a.5.5 0 011 0v3c0 .8-.7 1.5-1.5 1.5zM12 10.2c-2 0-5.4-.5-5.6-.5a.5.5 0 01.2-1s3.4.5 5.4.5c2 0 5.4-.5 5.4-.5.3 0 .6.1.6.4 0 .3-.2.5-.4.6-.2 0-3.6.5-5.6.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-pulse" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Pulse</title>' + '\n' +
					'				<path d="M12 17.5a.5.5 0 01-.5-.3L8 8l-3.5 4.3-.4.2H1a.5.5 0 010-1h2.8l3.8-4.8a.5.5 0 01.9.1l3.4 8.6.6-2.5c0-.2.3-.4.5-.4h.6l2-5.7c0-.2.2-.3.4-.3s.4.1.5.3l3.5 8.9 1.5-3.9c.1-.2.3-.3.5-.3h1a.5.5 0 010 1h-.7l-1.8 4.7c-.2.4-.8.4-1 0L16 8.5l-1.5 4.7c0 .2-.3.3-.5.3h-.6l-1 3.6c0 .2-.1.4-.4.4z"/><path d="M22.4 10.5h-.2a.5.5 0 01-.3-.7 5 5 0 10-9.4-2.3.5.5 0 01-1 0 5 5 0 10-9.4 2.3.5.5 0 01-1 .4A6 6 0 1112 5.1a6 6 0 1111 5.1c-.1.2-.3.3-.5.3zM12 22.5c-.1 0-.3 0-.4-.2l-7-8a.5.5 0 11.8-.6l6.6 7.5 5.1-6c.2-.2.5-.3.7 0 .2.1.3.4 0 .6l-5.4 6.5-.4.2z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-bp" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Blood Pressure</title>' + '\n' +
					'				<path d="M12 24a7.5 7.5 0 01-7.5-7.5c0-3.6 6.8-15.7 7-16.3.2-.3.8-.3 1 0 .2.6 7 12.7 7 16.3 0 4.1-3.4 7.5-7.5 7.5zm0-22.5a60 60 0 00-6.5 15 6.5 6.5 0 0013 0 60 60 0 00-6.5-15z"/><path d="M12 21c-2.5 0-4.5-2-4.5-4.5a.5.5 0 011 0c0 2 1.6 3.5 3.5 3.5a.5.5 0 010 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-temp" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Temperature</title>' + '\n' +
					'				<path d="M4.7 23.8h-.2c-2.3 0-4.2-2-4.3-4.3 0-1.3.6-2.6 1.7-3.6a4 4 0 013.5-1l14-14c1-1 2.7-1 3.6 0 1 1 1 2.7 0 3.8L9.1 18.6c.2.8.2 2-1 3.5-1 1-2.2 1.7-3.4 1.7zm0-8c-.7 0-1.4.3-2.2.9-.9.8-1.3 1.7-1.3 2.7 0 1.9 1.5 3.3 3.4 3.4 1 0 2-.5 2.7-1.3 1-1.3 1-2.2.8-3l.1-.5L22.3 4c.7-.7.7-1.7 0-2.3-.6-.7-1.6-.7-2.3 0l-14 14c-.2.2-.4.2-.5.2l-.8-.1z"/><path d="M4.7 21.8a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/><path d="M6.2 18.3l-.4-.1a.5.5 0 010-.8L15.3 8a.5.5 0 01.7.8l-9.5 9.5-.3.1zM10.2 17.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9zM12.2 15.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9zM14.2 13.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9zM16.2 11.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9zM18.2 9.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9zM20.2 7.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9zM22.2 5.3l-.4-.1-.5-.5a.5.5 0 01.7-.8l.5.5a.5.5 0 01-.3.9z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-pf" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Peak Flow</title>' + '\n' +
					'				<path d="M14 20c-2.5 0-4.4-.7-6.2-1.2-1.2-.4-2.3-.8-3.3-.8-2.3 0-3.7 1-3.7 1-.3 0-.6 0-.7-.2-.2-.3-.1-.6.1-.7C.3 18 2 17 4.5 17c1.1 0 2.3.4 3.6.8 1.7.6 3.6 1.2 5.9 1.2 6.1 0 9-1.6 9-5 0-5-2.7-5-4-5s-2 1-2 2 1 2 2.5 2a.5.5 0 010 1c-1.9 0-3.5-1.4-3.5-3a3 3 0 013-3c1.2 0 5 0 5 6s-7.5 6-10 6z"/><path d="M10.7 16.5c-1.3 0-2.6-.4-3.7-.8-1-.4-1.8-.7-2.5-.7-2.3 0-3.7 1-3.7 1a.5.5 0 01-.6-1c.1 0 1.7-1 4.3-1 .8 0 1.8.3 2.8.7 2.2.8 4.3 1.5 5.8-.5a.5.5 0 01.8.6c-1 1.3-2 1.7-3.2 1.7zM15.5 24c-3.7-.4-6-1.4-7.8-2a9 9 0 00-3.2-1c-2.3 0-3.7 1-3.7 1a.5.5 0 01-.6-1c.1 0 1.7-1 4.3-1 1.1 0 2.2.4 3.5 1 1.8.7 4 1.6 7.6 2 .2 0 .4.3.4.5 0 .3-.2.5-.5.5zM4.5 13a.5.5 0 01-.4-.9c1-1 1.4-2.8 1.7-4.6.2-1.7.5-3.3 1.4-4.2a4.6 4.6 0 016.5 0 4.6 4.6 0 010 6.5c-2 2-5.4 3.2-9.2 3.2zm6-10c-1 0-2 .4-2.6 1-.7.7-.9 2.1-1.1 3.6A13 13 0 015.5 12c3.1-.2 5.8-1.2 7.4-2.9a3.6 3.6 0 000-5c-.6-.7-1.5-1.1-2.5-1.1z"/><path d="M9.5 9a.5.5 0 010-1C10 7.7 14 4.4 14 .5a.5.5 0 011 0C15 5 10.3 9 9.5 9z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'		</svg>' + '\n' +
					'		<svg class="hide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '\n' +
					'			<symbol id="icon-diagnosis" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Diagnosis</title>' + '\n' +
					'				<circle cx="5" cy="1" r="1"/><path d="M7.5 13C2.5 13 2 9.1 2 5.5c0-4.1 2.2-5 3-5a.5.5 0 010 1c-.5 0-2 .7-2 4 0 4.1.7 6.5 4.5 6.5a.5.5 0 010 1z"/><circle cx="10" cy="1" r="1"/><path d="M14.5 24h-3C9 24 7 22 7 19.5v-7c0-.3.2-.5.5-.5 3.8 0 4.5-2.4 4.5-6.5 0-3.3-1.5-4-2-4a.5.5 0 010-1c.8 0 3 .9 3 5 0 3.5-.4 7.2-5 7.5v6.5c0 2 1.6 3.5 3.5 3.5h3c2 0 3.5-1.6 3.5-3.5v-1a.5.5 0 011 0v1c0 2.5-2 4.5-4.5 4.5z"/><path d="M18.5 19a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm0-6a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/><path d="M18.5 17a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0-2a.5.5 0 100 1 .5.5 0 000-1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-complications" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Complications</title>' + '\n' +
					'				<path d="M19.5 9l-.4-.1-.8-.9c-.6-.6-1.5-1-2.5-1H6.5a.5.5 0 01-.5-.4L5.4 3C5.2 1.9 4.2 1 3 1h-.5a.5.5 0 010-1H3C4.7 0 6 1.2 6.4 3L7 6h9c1.1 0 2.3.5 3.1 1.3l.9.8a.5.5 0 01-.4.9zM22.5 22a.5.5 0 01-.5-.5v-5c0-1.4-1.1-2.5-2.5-2.5h-1a.5.5 0 010-1h1c2 0 3.5 1.6 3.5 3.5v5c0 .3-.2.5-.5.5zM9 24A8 8 0 119 8a8 8 0 010 16zM9 9a7 7 0 100 14A7 7 0 009 9z"/><path d="M9 18a2 2 0 110-4 2 2 0 010 4zm0-3a1 1 0 100 2 1 1 0 000-2zM20.5 24a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM8 13.5a.5.5 0 01-.5-.4L7 10.6c0-.3.1-.5.4-.6.3 0 .5.1.6.4l.5 2.5a.5.5 0 01-.5.6zM14 14h-3a.5.5 0 010-1h3a.5.5 0 010 1z"/><circle cx="2" cy="1" r="1"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-investigations" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Investigations</title>' + '\n' +
					'				<path d="M12.5 14l-.4-.1-4-4a.5.5 0 010-.8l8-8c.2-.1.6-.1.8 0l4 4c.1.2.1.6 0 .8L19 7.6c-.2.2-.5.2-.7 0a2 2 0 00-2.8 2.8c.2.2.2.5 0 .7L12.9 14l-.4.1zM9.2 9.5l3.3 3.3 2-2a3 3 0 014.2-4.2l1-1.1-3.2-3.3-7.3 7.3z"/><path d="M20.5 24h-14a.5.5 0 01-.5-.5v-1.6C5 21 4.3 20 3.7 19H2.5a.5.5 0 01-.5-.5v-2c0-.3.2-.5.5-.5h9c.3 0 .5.2.5.5v2c0 .3-.2.5-.5.5H8.8c1 .7 2.2 1 3.7 1a5.5 5.5 0 004.7-8.3.5.5 0 01.3-.8A2 2 0 0019 9c0-.2.1-.5.3-.6l.6.1a9.4 9.4 0 01.3 11.5h.3c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5zM7 23h13v-2h-.8a.5.5 0 01-.4-.8 8.5 8.5 0 001-10 3 3 0 01-1.5 1.5c.5.9.7 1.8.7 2.8 0 3.6-3 6.5-6.5 6.5-2.3 0-4.3-.8-5.4-2.2a.5.5 0 01.4-.8H11v-1H3v1h1c.3 0 .5.1.5.3a6.8 6.8 0 002.3 3l.2.3V23z"/><path d="M9.5 15l-.4-.1-2-2a.5.5 0 010-.8l2-2c.2-.1.6-.1.8 0l2 2c.1.2.1.6 0 .8l-2 2-.4.1zm-1.3-2.5l1.3 1.3 1.3-1.3-1.3-1.3-1.3 1.3zM19.5 5l-.4-.1-2-2a.5.5 0 010-.8l2-2c.2-.1.6-.1.8 0l2 2c.1.2.1.6 0 .8l-2 2-.4.1zm-1.3-2.5l1.3 1.3 1.3-1.3-1.3-1.3-1.3 1.3zM17 12a3 3 0 110-6 3 3 0 010 6zm0-5a2 2 0 100 4 2 2 0 000-4z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-treatments" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Treatments</title>' + '\n' +
					'				<path d="M18 13H6a.5.5 0 010-1h12a.5.5 0 010 1zM18 21H6a.5.5 0 010-1h12a.5.5 0 010 1zM12 19a.5.5 0 01-.5-.5v-4a.5.5 0 011 0v4c0 .3-.2.5-.5.5z"/><path d="M14 17h-4a.5.5 0 010-1h4a.5.5 0 010 1zM16 5H8c-.8 0-1.5-.7-1.5-1.5v-2C6.5.7 7.2 0 8 0h8c.8 0 1.5.7 1.5 1.5v2c0 .8-.7 1.5-1.5 1.5zM8 1c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h8c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5H8z"/><path d="M16 24H8a2.5 2.5 0 01-2.5-2.5v-11c0-1.8 1.3-3.2 3-3.5V4.5c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5V7c1.7.3 3 1.7 3 3.5v11c0 1.4-1.1 2.5-2.5 2.5zM9.5 5v2.5c0 .3-.2.5-.5.5a2.5 2.5 0 00-2.5 2.5v11c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5v-11C17.5 9.1 16.4 8 15 8a.5.5 0 01-.5-.5V5h-5z"/><path d="M11 4.5a.5.5 0 01-.5-.5V.5a.5.5 0 011 0V4c0 .3-.2.5-.5.5zM9 5a.5.5 0 01-.5-.5v-4a.5.5 0 011 0v4c0 .3-.2.5-.5.5zM13 5a.5.5 0 01-.5-.5v-4a.5.5 0 011 0v4c0 .3-.2.5-.5.5zM15 4.5a.5.5 0 01-.5-.5V.5a.5.5 0 011 0V4c0 .3-.2.5-.5.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-clinics" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Clinics</title>' + '\n' +
					'				<path d="M23.5 24H.5a.5.5 0 01-.5-.5c0-2.7 1.7-5 4.4-5.9l2.5-.9.5.1 4.6 4 4.6-4h.5l2.5.8c2.7 1 4.4 3.2 4.4 5.9 0 .3-.2.5-.5.5zM1 23h22c-.2-2-1.6-3.7-3.7-4.4l-2.3-.8-4.7 4c-.2.2-.4.2-.6 0l-4.7-4-2.3.8A5.2 5.2 0 001 23zM10.5 11h-1a.5.5 0 010-1h1a.5.5 0 010 1zM14.5 11h-1a.5.5 0 010-1h1a.5.5 0 010 1zM8.5 16.5c-.5 0-4.2-.5-5.4-1.6a.5.5 0 010-.8C4.1 13.1 5 9.6 5 8a.5.5 0 011 0c0 1.5-.7 4.8-1.8 6.4 1 .5 3 1 4.4 1.1a.5.5 0 01-.1 1zM15.5 16.5a.5.5 0 010-1c1.2-.2 3.3-.6 4.3-1.1-1-1.6-1.8-5-1.8-6.4a.5.5 0 011 0c0 1.6.9 5.2 1.9 6.1.1.2.1.6 0 .8-1.2 1-5 1.5-5.3 1.6h-.1z"/><path d="M12 18c-2.5 0-4.7-2-5.6-5-.8 0-1.4-1.1-1.4-2.5 0-.4 0-.8.2-1.1C5 8.9 5 8.4 5 8a7 7 0 011.6-4.4c.2-.3.5-.3.7-.1.2.2.2.5 0 .7a6 6 0 00-1.1 5v.4c-.2.2-.2.6-.2.9 0 1 .4 1.5.5 1.5H7l.3.3C8 15 9.9 17 12 17s4-1.9 4.7-4.7a.5.5 0 01.8-.3c.1 0 .5-.5.5-1.5l-.1-1v-.2a5.9 5.9 0 00-1.3-5.1.5.5 0 11.8-.6 7 7 0 011.4 5.8l.2 1.1c0 1.4-.6 2.5-1.4 2.5-1 3-3.1 5-5.6 5z"/><path d="M7.5 7a.5.5 0 01-.5-.4L6.5 4a.5.5 0 011-.2L8 6.4a.5.5 0 01-.5.6zM16.5 7h-.1a.5.5 0 01-.4-.6l.5-2.6c0-.3.3-.5.6-.4.3 0 .5.3.4.6L17 6.6c0 .2-.3.4-.5.4zM18.3 9.9a13 13 0 01-7.4-3 .5.5 0 11.6-.8A12 12 0 0018.3 9a.5.5 0 010 1z"/><path d="M5.7 9.9a.5.5 0 01-.2-1s2.1-.8 3-2.6a.5.5 0 111 .4A7.6 7.6 0 015.6 10z"/><path d="M16.5 7h-9a.5.5 0 01-.5-.4l-1-5c0-.2 0-.5.3-.6C6.4 1 9 0 12 0s5.6 1 5.7 1c.2.1.3.4.3.6l-1 5c0 .2-.3.4-.5.4zM7.9 6h8.2l.8-4.2A16 16 0 0012 1a16 16 0 00-5 .8L8 6z"/><path d="M12 5a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2c0 .3-.2.5-.5.5z"/><path d="M13 4h-2a.5.5 0 010-1h2a.5.5 0 010 1zM12 22l-5.6-1a.5.5 0 01-.4-.6l.6-3.3a.5.5 0 111 .2L7 20l4.9.9 5-.9-.6-2.8a.5.5 0 111-.2l.6 3.3a.5.5 0 01-.4.6L12 22H12z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'		</svg>' + '\n' +
					'		<svg class="hide" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '\n' +
					'			<symbol id="icon-avoidance" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Avoidance</title>' + '\n' +
					'				<path d="M15 16.5h-.5V11c0-.3-.2-.5-.5-.5h-4a1.5 1.5 0 000 3h.5v3H10a1.5 1.5 0 000 3h5a1.5 1.5 0 000-3zm0 2h-5a.5.5 0 010-1h1c.3 0 .5-.2.5-.5v-4c0-.3-.2-.5-.5-.5h-1a.5.5 0 010-1h3.5V17c0 .3.2.5.5.5h1a.5.5 0 010 1zm-3-18a11.5 11.5 0 100 23 11.5 11.5 0 000-23zm0 22a10.5 10.5 0 110-21 10.5 10.5 0 010 21zm0-13a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-minor" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Minor</title>' + '\n' +
					'				<path d="M10.6 6.6c-.3.4-.5 1-.5 1.4l.9 8.6c0 .2.2.4.5.4h1c.3 0 .5-.2.5-.5l.8-8.5c.1-.5 0-1-.4-1.4a2 2 0 00-2.8 0zM12 16L11 8c0-.3.1-.5.3-.7.3-.4 1-.4 1.2 0l.3.6L12 16zm10.6 2.9L15 1.9A3.5 3.5 0 0012 0c-1.3 0-2.5.7-3 1.9l-7.6 17c-.6 1-.5 2.3 0 3.4.7 1 1.9 1.7 3.1 1.7h15c1.2 0 2.4-.6 3-1.7.6-1 .7-2.4 0-3.4zm-1 2.9c-.4.7-1.2 1.2-2.1 1.2h-15a2.5 2.5 0 01-2.2-3.7l7.5-17C10.2 1.5 11.1 1 12 1c1 0 1.7.5 2.2 1.3l7.5 17c.4.8.4 1.7 0 2.5zM12 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 2a.5.5 0 110-1 .5.5 0 010 1z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-contact" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Contact</title>' + '\n' +
					'				<path d="M16.5 7l-.6.1a1.5 1.5 0 00-2-1c-.1-.6-.7-1.1-1.4-1.1s-1.3.5-1.4 1.1l-.6-.1c-.5 0-.9.2-1.2.6a.5.5 0 00.8.6l.4-.2c.3 0 .5.2.5.5V9a.5.5 0 001 0V6.5a.5.5 0 011 0v4a.5.5 0 001 0v-3a.5.5 0 011 0v4a.5.5 0 001 0v-3a.5.5 0 011 0v5l-.1 1a.5.5 0 00.5.5c.2 0 .4-.1.5-.3l.1-1.2v-5c0-.8-.7-1.5-1.5-1.5zM12 0a12 12 0 100 24 12 12 0 000-24zm0 23A11 11 0 013.9 4.6L9 9.7V13l-.8-.8c-1-1-2.6-1-3.6 0-.2.2-.2.5 0 .7l4 4.5a5.4 5.4 0 007.8 0l.1-.2 2.9 3A11 11 0 0112 23zm-2.8-8.5a.5.5 0 00.8-.4v-3.4l5.8 5.8-.2.2a4.5 4.5 0 01-6.2 0l-3.7-4c.6-.3 1.3-.2 1.8.3l1.7 1.5zm11 5L16.7 16l-7-7L4.7 4A11 11 0 0123 12a11 11 0 01-2.9 7.4z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-major" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Major</title>' + '\n' +
					'				<path d="M16 24H8c-.6 0-1.2-.3-1.7-.7L.7 17.7c-.4-.5-.7-1.1-.7-1.8V8.1c0-.7.3-1.3.7-1.8L6.3.7C6.8.3 7.4 0 8.1 0h7.8c.7 0 1.3.3 1.8.7l5.6 5.6c.4.5.7 1.1.7 1.8v7.8c0 .7-.3 1.3-.7 1.8l-5.6 5.6c-.5.4-1.1.7-1.8.7zM8 1c-.3 0-.7.2-1 .4L1.4 7c-.2.3-.4.7-.4 1v8c0 .3.2.7.4 1L7 22.6c.3.2.7.4 1 .4h8c.3 0 .7-.2 1-.4l5.6-5.6c.2-.3.4-.7.4-1V8c0-.3-.2-.7-.4-1L17 1.4c-.3-.2-.7-.4-1-.4H8z"/><path d="M5 16c-1 0-2-1-2-2.1 0-.3.2-.5.5-.5s.5.2.5.4c0 .7.5 1.2 1 1.2.6 0 1-.6 1-1.3 0-.8-.5-1-1-1.2V12l-.2.5C3.3 12 3 11 3 10.2 3 9 3.9 8 5 8c1 0 2 1 2 2.1 0 .3-.2.5-.5.5s-.5-.2-.5-.4C6 9.5 5.5 9 5 9c-.6 0-1 .6-1 1.3 0 .8.5 1 1 1.2h.2C6.4 12 7 12.6 7 13.8 7 15 6.1 16 5 16zm6.5-7h-4a.5.5 0 010-1h4a.5.5 0 010 1z"/><path d="M9.5 16a.5.5 0 01-.5-.5v-7a.5.5 0 011 0v7c0 .3-.2.5-.5.5zm4.5 0a2 2 0 01-2-2v-4a2 2 0 014 0v4a2 2 0 01-2 2zm0-7a1 1 0 00-1 1v4a1 1 0 002 0v-4c0-.6-.4-1-1-1zm3.5 7a.5.5 0 01-.5-.5v-7c0-.3.2-.5.5-.5h2c.8 0 1.5.7 1.5 1.5v2c0 .8-.7 1.5-1.5 1.5H18v2.5c0 .3-.2.5-.5.5zm.5-4h1.5c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5H18v3z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'			<symbol id="icon-dangerous" fill="currentColor" viewbox="0 0 24 24">' + '\n' +
					'				<title>Dangerous</title>' + '\n' +
					'				<path d="M20 11.7l-5-.4c-.2 0-.3 0-.5.2l-.1.4a2.4 2.4 0 01-1.3 2.3.5.5 0 00-.2.7l2.8 4.3a.5.5 0 00.7.1 8.6 8.6 0 004.1-7.1c0-.3-.2-.5-.5-.5zm-1.5 4c-.6 1-1.3 1.9-2.2 2.5L14 14.8a3.4 3.4 0 001.4-2.4l4 .2c0 1.1-.3 2.2-.9 3.2zm-8.5-6c0 .2.1.3.3.3h.4c.8-.6 1.8-.6 2.6 0a.5.5 0 00.7-.2L16.3 5c.1-.2 0-.5-.2-.6a8.6 8.6 0 00-8.2 0c-.2.1-.3.4-.2.6L10 9.8zm5.2-4.6L13.4 9a3.4 3.4 0 00-2.8 0L8.8 5c2-.9 4.4-.9 6.4 0zm-4.3 9A2.4 2.4 0 019.6 12l-.1-.4a.5.5 0 00-.4-.2l-5.1.4c-.3 0-.5.2-.5.5a8.7 8.7 0 004.1 7.1l.3.1c.1 0 .3 0 .4-.2l2.8-4.3a.5.5 0 00-.2-.7zm-3.2 4.1a7.6 7.6 0 01-3.2-5.6l4.1-.2a3.4 3.4 0 001.4 2.4l-2.3 3.4zM12 .5a11.5 11.5 0 100 23 11.5 11.5 0 000-23zm0 22a10.5 10.5 0 110-21 10.5 10.5 0 010 21zM13.5 12c0-.8-.7-1.5-1.5-1.5a1.5 1.5 0 000 3c.8 0 1.5-.7 1.5-1.5zm-1.5.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"/>' + '\n' +
					'			</symbol>' + '\n' +
					'		</svg>' + '\n' +
					'	</body>' + '\n' +
					'</html>';
	download('Medica11y.html', 'text/html', header + pHead + profile + pBody + section + footer ); }, false);
})();