({
    /**
     * Lifecycle Events
     */
    doInit: function(component, event, helper) {
        /*
        var materials = [
            { 'id':'barbershop.png', 'src': '/MarketingEmailRequestResources/materials/barbershop.png' },
            { 'id':'birmingham.png', 'src': '/MarketingEmailRequestResources/materials/birmingham.png' },
            { 'id':'forgiveandforget.png', 'src': '/MarketingEmailRequestResources/materials/forgiveandforget.png' },
            { 'id':'omaha.png', 'src': '/MarketingEmailRequestResources/materials/omaha.png' },
            { 'id':'storm.png', 'src': '/MarketingEmailRequestResources/materials/storm.png' },
            { 'id':'watches.png', 'src': '/MarketingEmailRequestResources/materials/watches.png' },
            { 'id':'youthcamp1.png', 'src': '/MarketingEmailRequestResources/materials/youthcamp1.png' },
            { 'id':'youthcamp2.png', 'src': '/MarketingEmailRequestResources/materials/youthcamp2.png' },
            { 'id':'youthcamp3.png', 'src': '/MarketingEmailRequestResources/materials/youthcamp3.png' },
        ];
        component.set("v.materials", materials);
        */
    },

    handleTemplate1Selected : function(component, event, helper) {
        component.set("v.selectedTemplate", "template1");
    },
    handleTemplate2Selected : function(component, event, helper) {
        component.set("v.selectedTemplate", "template2");
    },
    handleTemplate3Selected : function(component, event, helper) {
        component.set("v.selectedTemplate", "template3");
    },
    handleTemplate4Selected : function(component, event, helper) {
        component.set("v.selectedTemplate", "template4");
    },
    handleTemplate5Selected : function(component, event, helper) {
        console.log('handleTemplate5Selected');
        component.set("v.selectedTemplate", "template5");
    },
    handleTemplate1BannerClick: function(component, event, helper) {
        var banners = component.get("v.selectedMaterials");
        banners.push({'src':''});
        component.set("v.selectedMaterials", banners);
    },

    /**
     * Handle Drag and Drop
     */
    handleDraggableItemOnClick : function(component, event, helper) {
        console.log('[handleDraggableItemOnClick] event.target.id', event.target.id);
        let el = window.document.getElementById(event.target.id);
        console.log('[handleDraggableItemOnClick] el', el);
        if (el) {
            console.log('[handleDraggableItemOnClick] el is found. classlist', el.classList);
            
            if (el.classList.contains('drag-item-selected')) {
                console.log('[handleDraggableItemOnClick] el has class will remove it');

                el.classList.remove('drag-item-selected');
                component.set("v.dragElementId", "");
            } else {
                console.log('[handleDraggableItemOnClick] el does not have class will add it');
                el.classList.add("drag-item-selected");
                component.set("v.dragElementId", event.target.id);
            }
        }
        /*
        if ($A.util.hasClass("draggable-selected")) {
            $A.util.removeClass(cmp, "drag-item-selected");
	    	component.set("v.dragElementId", ""); 
        } else {
            $A.util.addClass(cmp, "drag-item-selected");
    		component.set("v.dragElementId", event.target.id); 
        }
        */
    },
    handleDroppableItemOnClick : function(component, event, helper) {
        console.log("[handleDroppableItemOnClick] dropped id", event.target.id);
        console.log("[handleDroppableItemOnClick] event.target.parentElement", event.target.parentElement.id);
        var draggedElementId = component.get("v.dragElementId");
        console.log("[handleDroppableItemOnClick] draggedElementId", draggedElementId);
        if (draggedElementId != "") {
            let materials = component.get("v.materials");
            var selectedMaterials = component.get("v.selectedMaterials");
            for(var i = 0; i < materials.length; i++) {
                if (materials[i].Id == draggedElementId) {
                    selectedMaterials[selectedMaterials.length - 1] = materials[i];
                    break;
                }
            }            
            selectedMaterials.push({});
            component.set("v.selectedMaterials", selectedMaterials);

            let el = window.document.getElementById(draggedElementId);
            console.log('[handleDraggableItemOnClick] el', el);
            if (el) {
                console.log('[handleDraggableItemOnClick] el is found. classlist', el.classList);
                
                el.classList.remove('drag-item-selected');
            }
    
            /*
            var cmp = component.find(draggedElementId);
            $A.util.removeClass(cmp, "drag-item-selected");
            
            try {
                var draggedElement = document.getElementById(draggedElementId);
                var dropElement = document.getElementById(event.target.id);
                console.log('[handleDroppableItemOnClick] draggedElement', draggedElement);
                console.log('[handleDroppableItemOnClick] dropElement', dropElement);
                var dropTarget = dropElement;
                if (dropElement.nodeName == 'IMG') {
                    dropTarget = document.getElementById(event.target.parentElement.id);
    
                    var imgContainer = document.getElementById(draggedElementId + '_container');
                    if (imgContainer) {
                        draggedElement.classList.removeClass('material');
                        imgContainer.appendChild(event.target);
                    }
                    
                }
                
                if (event.target.id != draggedElementId) {
                	dropElement.appendChild(draggedElement);                                
                }
                
            }catch(ex) {
                console.log('[AU_SegmentationModel_Walkthrough.controller.handleDroppableItemOnClick] exception: ', ex);
            }
            
            component.set("v.dragElementId", "");

            let template = component.get("v.selectedTemplate");
            if (template == 'template1') {
                var banners = component.get("v.selectedMaterials");
                banners[banners.length -1] = { 'id': draggedElementId, 'src':draggedElement.src};
                banners.push({});
                component.set("v.selectedMaterials", banners);
            }
            */
        }
    },
    handleOnDragStart : function(component, event, helper) {
        console.log('*** dragstart ***');
        try {    
            console.log('event.targe.id', event.target.id);
            //alert('drag started');
            var cmp = component.find(event.target.id);
            $A.util.addClass(cmp, 'dragstart');
            //console.log('startId: ', event.target.id);            
            component.set("v.dragElementId", event.target.id);
            event.dataTransfer.setData('text', event.target.id);
            event.dataTransfer.dropEffect = 'copy';
        }catch(ex) {
            console.log('[dragstart] exception: ' + ex.toString());
        }
    },
    handleOnDragOver : function(component, event, helper) {
        event.preventDefault();
    },
    handleOnDrop : function(component, event, helper) {
        try {
            console.log('*** handleOnDrop ***');
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
            //console.log('event: ', event);
            var data = event.dataTransfer.getData('text');
            var id = event.target.id;
            let materials = component.get("v.materials");
            var banners = component.get("v.selectedMaterials");
            for(var i = 0; i < materials.length; i++) {
                if (materials[i].Id == data) {
                    banners[banners.length - 1] = materials[i];
                    break;
                }
            }            
            banners.push({});
            component.set("v.selectedMaterials", banners);
            let el = window.document.getElementById(data);
            console.log('[handleDraggableItemOnClick] el', el);
            if (el) {
                console.log('[handleDraggableItemOnClick] el is found. classlist', el.classList);
                
                el.classList.remove('drag-item-selected');
            }

            /*
            console.log('[handleDrop] data: ', data);
            console.log('[handleDrop] id: ', id);
            console.log('[handleDrop] event.target: ', event.target);
            console.log('[handleDrop] event.target.id: ', event.target.id);
            console.log('[handleDrop] event.target.nodename: ', event.target.nodeName);
            console.log('[handleDrop] event.target.parentElement: ', event.target.parentElementId);
            var dropTarget = event.target;
            if (event.target.nodeName == 'IMG') {
                dropTarget = document.getElementById(event.target.parentElement.id);

                var imgContainer = document.getElementById(id + '_container');
                if (imgContainer) {
                    imgContainer.appendChild(event.target);
                }
                
            }
            var draggedElement = document.getElementById(data).cloneNode(true);
            console.log('[handleDrop] draggedElement', draggedElement);
            draggedElement.classList.remove('material');
            dropTarget.appendChild(draggedElement);
            //dropTarget.appendChild(document.getElementById(data).cloneNode(true));

            console.log('[handledrop] materials', materials);
            var banners = component.get("v.template1Banners");
            for(var i = 0; i < materials.length; i++) {
                if (materials[i].Id == data) {
                    banners.unshift(materials[i]);
                    console.log('[handleDrop] material dragged', materials[i]);
                    break;
                }
            }
            //banners.push({});
            component.set("v.template1Banners", banners);
            for(var i = 0; i < banners.length; i++) {
                console.log('[handledrop] banners', banners[i]);
            }
            */

        } catch(ex) {
            console.log('[handledrop] exception: ' + ex.toString());
        }
    },
    handleOnTouchStart : function(component, event, helper) {
        //console.log('*** touchstart ***');
        try {
            //console.log('startId: ', event.target.id);
            component.set("v.dragElementId", event.target.id);
        }catch(ex) {
            console.log('[touchstart] exception: ' + ex.toString());
        }
    },
    handleOnTouchMove : function(component, event, helper) {
        //console.log('*** touchmove ***', event);
		//console.log('[touchmove] event.target', event.target);
		//console.log('[touchmove] event.touches', event.touches);        
    	event.preventDefault();          
        var element = document.getElementById(event.target.id);
        //console.log('[touchmove] element', element);
        element.style.left = event.touches[0].pageX;
        element.style.top = event.touches[0].pageY;
    },
    handleOnTouchEnd : function(component, event, helper) {
        //console.log('*** touchend ***');
        try {
            //console.log('startId: ', event.target.id);
            component.set("v.dragElementId", '');
        }catch(ex) {
            console.log('[touchstart] exception: ' + ex.toString());
        }        
    },
    handleRemoveBannerButtonClick: function(component, event, helper) {
        event.stopPropagation();
        console.log('remove banner: ', event.target.id);
        let banners = component.get("v.selectedMaterials");
        for(var i = 0; i < banners.length; i++) {
            console.log('banners.id', banners[i].id);
            if (banners[i].Id == event.target.id) {
                banners.splice(i, 1);
                break;
            }
        }
        for(var i = 0; i < banners.length; i++) {
            console.log('banners', banners[i].id);            
        }
        component.set("v.selectedMaterials", banners);
    },
    handleImageOnLoad: function(component, event) {
        let spinner = document.getElementById(event.target.id + '_spinner');
        console.log('event.target.id', event.target.id);
        console.log('spinner', spinner);
        spinner.classList.add("slds-hide");
    },
    /**
     * Public Methods
     */
    getSelectedMaterials: function(component, event, helper) {
        let selectedMaterials = component.get("v.selectedMaterials");
        console.log('[getSelectedMaterials] selectedMaterials', selectedMaterials);
        //selectedMaterials.splice(selectedMaterials.length - 1, 1);
        //console.log('[getSelectedMaterials] selectedMaterials', selectedMaterials);
        let action = component.getEvent("bf_event_GetListData");
        action.setParams({
            "itemType": "materials",
            "theList" : selectedMaterials
        });
        action.fire();                        

    }
})
