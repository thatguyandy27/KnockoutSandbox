(function (window, $, refrenceList, initialReferenceId) {

    var vm = (function () {

        function vm() {
            var vm = this;
            vm.breadCrumbs = ko.observableArray([]);
            vm.selectedItem = ko.observable({});
            vm.leftNavItems = ko.observableArray([]);

            // in a real app we might just not have this here.  it should probably be something like a call out to the service or something
            // depending on how many items there are
            vm.allItems = ko.observableArray(refrenceList);

            function getLeftNavItems() {
            }

        }

        return new vm();
    })();

    window.viewmodel = vm;
})(this, this.jQuery, referenceList, initialReferenceId);