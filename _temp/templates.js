angular.module('hod.proving').run(['$templateCache', function($templateCache) {$templateCache.put('modules/familymigration/familymigration.html','<div class="column-full-width ng-scope"><div id="page1"><h1 class="heading-large" id="pageTitle" tabindex="-1"><span class="heading-secondary">Financial requirement check</span> <span id="pageSubHeading">Family Migration</span></h1><h2 class="form-title heading-large" id="pageSubTitle">Individual\'s details</h2><div class="text"><p class="lede" id="pageSubText">You can check an individual meets the Category A requirement using a National Insurance Number.</p></div><hod-form name="familyDetails" submit="detailsSubmit"><hod-text name="nino" label="National Insurance Number" hint="For example, \'QQ 12 34 56 C\'." field="familyDetails.nino" config="conf.nino"></hod-text><hod-number name="dependants" label="Number of dependants" field="familyDetails.dependants" config="conf.dependants" required="false"></hod-number><hod-date name="applicationRaisedDate" label="When was the application raised" field="familyDetails.applicationRaisedDate" hint="For example, 31 3 1980" config="conf.applicationRaisedDate"></hod-date><hod-submit value="Check eligibility"></hod-submit></hod-form></div></div>');
$templateCache.put('modules/familymigration/familymigrationResult.html','<div id="page2" class="ng-scope"><div ng-if="haveResult"><h2 id="pageStaticHeading">Financial requirement check</h2><h3 id="pageStaticSubHeading">Does the applicant meet the Category A financial requirement?</h3><div class="govuk-box-highlight" ng-class="{\'panel-fail\': !success}"><h1 class="bold-large" id="pageDynamicHeading"><span id="outcome">{{ heading }}</span></h1><p id="pageDynamicDetail"><span>{{ reason }}</span></p></div></div><div ng-if="!haveResult"><h1 class="form-title heading-large"><span id="pageDynamicHeading">{{ heading }}</span></h1><p class="lede ng-scope"><span id="pageDynamicDetail" class="ng-binding">{{ reason }}</span></p></div><div ng-if="!success"><h2 id="whatToDoNextHeading">What to do next</h2><p id="whatToDoNextSubHeading">You should consider if the applicant meets the financial requirement under any other category.</p></div><h2 class="heading-medium ng-scope">Your search</h2><table class="ng-scope"><tr><th scope="col">Individual</th><th scope="col">Dependants</th><th scope="col">National Insurance Number</th><th scope="col">Application raised</th></tr><tr><td><span id="yourSearchIndividualName" class="ng-binding">{{ individual.forename}} {{ individual.surname }}</span></td><td><span id="yourSearchDependants">{{ familyDetails.dependants }}</span></td><td><span id="yourSearchNationalInsuranceNumber">{{ familyDetails.nino }}</span></td><td><span id="yourSearchApplicationRaisedDate">{{ familyDetails.displayDate }}</span></td></tr></table><br><br><div class="form-group"><input type="submit" class="button" value="Start a new search" ng-click="newSearch()"></div><div class="form-group ng-scope"><details role="group"><summary role="button" aria-controls="details-content-0" aria-expanded="false"><span class="summary" id="pageAppendixTitle">Where can I find the appendix?</span></summary><div class="panel panel-border-narrow" id="details-content-0" aria-hidden="true"><p>You can find all the guidance on gov.uk under <a href="https://www.gov.uk/government/publications/chapter-8-appendix-fm-family-members" id="chapter8Link">Chapter 8 of the immigration directorate instructions.</a></p><p>You can also view <a href="https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/469692/Appendix_FM_1_7_Financial_Requirement_August_2015.pdf" id="fm1_7Link">Appendix FM 1.7</a> which relates specifically to this financial requirement.</p></div></details></div></div>');
$templateCache.put('modules/forms/forms-date.html','<fieldset class="form-group" ng-class="{error: displayError}" ng-hide="config.hidden" id="{{ config.id }}-wrapper"><legend class="form-label-bold">{{ label }}</legend><div class="form-date" id="{{ config.id }}"><span class="form-hint">{{ hint }}</span><div ng-if="displayError" id="{{ config.id }}-error" class="form-error validation-message">{{ displayError }}</div><div class="form-group form-group-day"><label for="{{ config.id }}Day">Day</label><input class="form-control" name="{{ name }}Day" id="{{ config.id }}Day" type="text" ng-model="data.day" ng-change="dateChanged()" autocomplete="off" maxlength="2"></div><div class="form-group form-group-month"><label for="{{ config.id }}Month">Month</label><input class="form-control" name="{{ name }}Month" id="{{ config.id }}Month" type="text" ng-model="data.month" ng-change="dateChanged()" autocomplete="off" maxlength="2"></div><div class="form-group form-group-year"><label for="{{ config.id }}Year">Year</label><input class="form-control" name="{{ name }}Year" id="{{ config.id }}Year" type="text" ng-model="data.year" ng-change="dateChanged()" autocomplete="off" maxlength="4"></div></div></fieldset>');
$templateCache.put('modules/forms/forms-radio.html','<div id="{{ name }}-form-group" class="form-group" ng-class="{error: displayError}" ng-hide="config.hidden"><fieldset ng-class="{inline: config.inline}"><legend class="form-label-bold" id="{{ config.id }}">{{ label }}</legend><div class="form-hint">{{ hint }}</div><div ng-if="displayError" id="{{ config.id }}-error" class="form-error validation-message">{{ displayError }}</div><div class="radio-group" ng-repeat="(i, opt) in options"><label class="block-label" for="{{ config.id }}-{{ i }}"><input id="{{ config.id }}-{{ i }}" type="radio" name="{{ name }}" ng-model="field" value="{{ opt.value }}" ng-click="radioClick(opt)" ng-required="config.required" ui-validate="\'validfunc($value)\'"> {{ opt.label }}</label></div></fieldset></div>');
$templateCache.put('modules/forms/forms-sortcode.html','<div class="form-group" ng-class="{error: displayError}" ng-hide="config.hidden"><fieldset><legend class="form-label-bold">{{ label }}</legend><div class="form-date"><span class="form-hint">{{ hint }}</span><div ng-if="displayError" id="{{ config.id }}-error" class="form-error validation-message">{{ displayError }}</div><div class="form-group form-group-sortcode"><label for="{{ config.id }}Part1" class="visuallyhidden">Sortcode part 1</label><input class="form-control" name="{{ name }}Part1" id="{{ config.id }}Part1" type="text" ng-model="data.part1" ng-change="itChanged()" autocomplete="off" maxlength="2"></div><div class="form-group form-group-sortcode"><label for="{{ name }}Part2" class="visuallyhidden">Sortcode part 2</label><input class="form-control" name="{{ name }}Part2" id="{{ config.id }}Part2" type="text" ng-model="data.part2" ng-change="itChanged()" autocomplete="off" maxlength="2"></div><div class="form-group form-group-sortcode"><label for="{{ name }}Part3" class="visuallyhidden">Sortcode part 3</label><input class="form-control" name="{{ name }}Part3" id="{{ config.id }}Part3" type="text" ng-model="data.part3" ng-change="itChanged()" autocomplete="off" maxlength="2"></div></div></fieldset></div>');
$templateCache.put('modules/forms/forms-submit.html','<div class="form-group"><input type="submit" class="button" value="{{ value }}" ng-disabled="disable()"></div>');
$templateCache.put('modules/forms/forms-text.html','<fieldset ng-hide="config.hidden" id="{{ config.id }}-wrapper"><legend class="visually-hidden">{{ label }}</legend><div class="form-group" ng-class="{error: displayError}"><label class="form-label-bold {{ type }}" for="{{ config.id }}">{{ label }}</label><div class="form-hint">{{ hint }}</div><div ng-if="displayError" id="{{ config.id }}-error" class="form-error validation-message">{{ displayError }}</div>{{ config.prefix }}<input id="{{ config.id }}" name="{{ name }}" class="form-control" ng-class="config.classes" type="text" ng-model="field" ui-validate="\'validfunc($value)\'" maxlength="{{ maxlength }}">{{ config.suffix }}</div></fieldset>');
$templateCache.put('modules/forms/forms.html','<form name="{{ name }}Form" ng-submit="submitForm()" novalidate><div class="error-summary" role="group" aria-label="Form error summary" tabindex="-1" ng-if="showErrors"><h1 class="heading-medium error-summary-heading" id="validation-error-summary-heading">There\'s some invalid information</h1><p id="validation-error-summary-text">Make sure that all the fields have been completed</p><ul class="error-summary-list" id="error-summary-list"><li ng-repeat="obj in errorList"><a href="" ng-click="errorClicked(obj.anchor)">{{ obj.msg }}</a></li></ul></div><ng-transclude></ng-transclude></form>');
$templateCache.put('modules/forms/forms__test.html','<h1>{{ testElement }}</h1><div ng-if="testElement === \'text\'"><hod-form id="testFormText"><!-- test defaults --><hod-text></hod-text><!-- test autoassign id  --><hod-text label="This is my first test"></hod-text><!-- test basics --><hod-text label="Forename" name="forename" hint="Let me give you a clue" required="false" field="values.forename" config="confForename"></hod-text><hod-text id="surnameTest" label="Surname" name="surname" hint="What is your name" field="values.surname" config="confSurname"></hod-text><p id="surnameFeedback">values.surname: <span>{{ values.surname }}</span></p><hod-number label="A number" name="numTest" hint="Enter a number" field="values.n"></hod-number><hod-number label="Max test" name="maxTest" hint="Enter a number up to 123" field="values.max" config="confMax"></hod-number><hod-number label="Min test" name="minTest" hint="Enter a number above 123" field="values.min" config="confMin"></hod-number><hod-number label="MinMax test" name="minMaxTest" hint="Enter a number between 10 and 20" field="values.minMax" config="confMinMax"></hod-number><hod-number label="Length test" name="lengthTest" hint="8 chars long" field="values.len" config="confLength"></hod-number><hod-number label="Float test" name="floatMaxTest" hint="Enter a number up to 123" field="values.float" config="confFloat"></hod-number><hod-text label="Hidden" name="hiddenText" field="values.hiddenText" config="confHiddenText"></hod-text><hod-number label="Hidden" name="hiddenNumber" field="values.hiddenNumber" config="confHiddenNumber"></hod-number><hod-submit></hod-submit></hod-form></div><div ng-if="testElement === \'radio\'"><hod-form id="testFormRadio"><hod-radio name="student-type" label="Student type" field="values.sType" options="sTypeOptions" config="confType"></hod-radio><hod-radio name="london" label="In London" field="values.london" options="londonOptions" config="confLondon"></hod-radio><hod-submit></hod-submit></hod-form></div><div ng-if="testElement === \'date\'"><hod-form id="testFormDate"><hod-date label="Start date" field="values.start" config="confStart"></hod-date><hod-date label="End date" hint="When does this thing end" field="values.end" config="confEnd"></hod-date><hod-date label="Age date" hint="When were you born?" name="dob" field="values.dob" config="confDob" required="false"></hod-date><hod-date label="Hidden date" name="hide" field="values.hiddenDate" config="confHiddenDate"></hod-date><hod-submit></hod-submit></hod-form><p id="startFeedback">{{ values.start }}</p><p id="endFeedback">{{ values.end }}</p></div><div ng-if="testElement === \'sortcode\'"><hod-form id="testFormSortcode"><hod-sortcode label="Sort code" hint="For example 12 34 56" field="values.sortcode" config="confSortcode"></hod-sortcode><hod-sortcode label="Sort code2" field="values.sortcode2" required="false"></hod-sortcode><p id="sortcodeFeedback">{{ values.sortcode }}</p><p id="sortcode2Feedback">{{ values.sortcode2 }}</p><hod-submit></hod-submit></hod-form></div>');}]);