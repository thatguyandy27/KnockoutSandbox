/// <reference path="Libraries/knockout-2.1.0.js" />
/// <reference path="Libraries/jquery-1.8.2.js" />
/// <reference path="Models/reference.js" />


var referenceList = [new Reference('Home', 'home', function(){}) ];
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