/// <reference path="Libraries/knockout-2.1.0.js" />
/// <reference path="Libraries/jquery-1.8.2.js" />
/// <reference path="Models/reference.js" />


var referenceList = [new Reference('Home', 'home', function () { }, ['overview_home', 'organization_home', 'navigation_home', 
        'layout_home', 'lists_home', 'actions_home', 'complex_home', 'input_home', 'social_home', 'mobile_home', 'finish_home']),
    new Reference('Overview', 'overview_home', function(){} ),
    new Reference('Organization', 'organization_home', function () { }),
    new Reference('Navigation', 'navigation_home'),
    new Reference('Page Layout', 'layout_home'),
    new Reference('Lists', 'lists_home'),
    new Reference('Actions', 'actions_home'),
    new Reference('Complex Data', 'complex_home'),
    new Reference('Input', 'input_home'),
    new Reference('Social', 'social_home'),
    new Reference('Mobile', 'mobile_home'),
    new Reference('Finishing Touches', 'finish_home')
];
var initialReferenceId = 'home';

(function (window, $, refrenceList, initialReferenceId) {

    var vm = (function () {

        function vm(refrenceList, initialReferenceId) {
            var vm = this;

            vm.breadCrumbs = ko.observableArray([]);
            vm.selectedItem = ko.observable({});
            vm.leftNavItems = ko.observableArray([]);

            // in a real app we might just not have this here.  it should probably be something like a call out to the service or something
            // depending on how many items there are
            vm.allItems = ko.observableArray(refrenceList);

            function getLeftNavItems(selectedFeature) {
                vm.leftNavItems.removeAll();
                for (var i = 0; i < selectedFeature.subSections.length; i++) {
                    for (var j = 0; j < vm.allItems().length; j++) {
                        if (selectedFeature.subSections[i] == vm.allItems()[j].id)
                            vm.leftNavItems.push(vm.allItems()[j]);
                    }

                }
            }

            function updateSelected(selectedId){
                for (var i = 0; i < vm.allItems().length; i++) {
                    if (initialReferenceId == vm.allItems()[i].id) {
                        vm.selectedItem = vm.allItems()[i];
                        vm.breadCrumbs.push(new breadCrumb(vm.selectedItem.header, vm.selectedItem.id));
                        break;
                    }

                }
                getLeftNavItems(vm.selectedItem);
            }

            updateSelected(initialReferenceId);
        }

        return new vm(refrenceList, initialReferenceId);
    })();

    window.viewmodel = vm;
})(this, this.jQuery, referenceList, initialReferenceId);