/// <reference path="Libraries/knockout-2.1.0.js" />
/// <reference path="Libraries/jquery-1.8.2.js" />
/// <reference path="Models/reference.js" />


var referenceList = [new Reference('Home', 'home', function () { }, ['organization_home', 'navigation_home', 
        'layout_home', 'lists_home', 'actions_home', 'complex_home', 'input_home', 'social_home', 'mobile_home', 'finish_home']),
  //  new Reference('Overview', 'overview_home', function(){} ),
   //organizations
   new Reference('Organization', 'organization_home', function () { }, ['organization_feature',
    'organization_news', 'organization_picture', 'organization_dashboard', 'organization_canvas', 
    'organization_wizard', 'organization_settings', 'organization_altviews', 'organization_manyws', 'organization_help']),
    new Reference('Feature, Search, Browse', 'organization_feature'),   
    new Reference('News Stream', 'organization_news'),                  
    new Reference('Picture Manager', 'organization_picture'),           
    new Reference('Dashboard', 'organization_dashboard'),               
    new Reference('Canvas + Palette', 'organization_canvas'),           
    new Reference('Wizard', 'organization_wizard'),                     
    new Reference('Settings', 'organization_settings'),                 
    new Reference('Alternative Views', 'organization_altviews'),        
    new Reference('Many Workspaces', 'organization_manyws'),            
    new Reference('Help', 'organization_help'),
    //navigation
       new Reference('Navigation', 'navigation_home', function () { }, ['navigation_entrypoints', 'navigation_menu',
        'navigation_pyramid', 'navigation_linkedstate', 'navigation_escapehatch', 'navigation_fatmenus',
        'navigation_sitemapfooter', 'navigation_signin', 'navigation_sequencemap', 'navigation_breadcrumbs',
        'navigation_annotatedscroll', 'navigation_animatedtransition']),
    new Reference('Clear Entry Points', 'navigation_entrypoints'),
    new Reference('Menu Page', 'navigation_menu'),
    new Reference('Pyramid', 'navigation_pyramid'),
    new Reference('Deep-linked State', 'navigation_linkedstate'),
    new Reference('Escape Hatch', 'navigation_escapehatch'),
    new Reference('Fat Menus', 'navigation_fatmenus'),
    new Reference('Sitemap Footer', 'navigation_sitemapfooter'),
    new Reference('Sign-in Tools', 'navigation_signin'),
    new Reference('Sequence Map', 'navigation_sequencemap'),
    new Reference('Breadcrumbs', 'navigation_breadcrumbs'),
    new Reference('Annotated Scrollbar', 'navigation_annotatedscroll'),
    new Reference('Animated Transition', 'navigation_animatedtransition'),
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

            function updateBreadCrumbs(id) {

                var itemsToRemove = [];
                for (var j = 0; j < vm.breadCrumbs().length; j++) {
                    if (vm.breadCrumbs()[j].id == id) {
                        for (j; j < vm.breadCrumbs().length; j++) {
                            itemsToRemove.push(vm.breadCrumbs()[j]);
                        }
                     
                    }
                }

                if (itemsToRemove.length > 0)
                    vm.breadCrumbs.removeAll(itemsToRemove);

                vm.breadCrumbs.push(new breadCrumb(vm.selectedItem.header, vm.selectedItem.id));
            }

            vm.updateSelected = function (selectedId){
                for (var i = 0; i < vm.allItems().length; i++) {
                    if (selectedId == vm.allItems()[i].id) {
                        vm.selectedItem = vm.allItems()[i];
                        updateBreadCrumbs(vm.selectedItem.id);
                        break;
                    }

                }
                getLeftNavItems(vm.selectedItem);
            }

            vm.updateSelected(initialReferenceId);
        }

        return new vm(refrenceList, initialReferenceId);
    })();

    window.viewmodel = vm;
})(this, this.jQuery, referenceList, initialReferenceId);