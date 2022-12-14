/* kForm v1 © Refkinscallv | kform.github.io (documentation) */
window.onload = function(){
    if(!window.jQuery){
        alert("kForm Alert\n\njQuery not installed\nPlease install it first with at least version 3.6.0");
    } else {
        $("body").prepend("<style>.kform {display:none} .kform-show {display:block}</style>");
    }
}

class kForm{
    constructor(data){
        if(typeof data.default_tab !== "undefined"){
            if(data.default_tab == "" || data.default_tab == null || data.default_tab == false){
                alert("kForm Alert\n\ndefault_tab not set properly\nuse tabs value");
                this.kformStep("0");
            } else {
                var tabReturn = (!isNaN(data.default_tab) && parseInt(Number(data.default_tab)) == data.default_tab && !isNaN(parseInt(data.default_tab, 10)))? data.default_tab.toString() : data.default_tab;
                this.kformStep(tabReturn);
            }
        } else {
            this.kformStep("1");
        }

        if(typeof data.message_alert !== "undefined"){
            if(data.message_alert == "" || data.message_alert == null){
                this.alert = " can not be empty";
            } else {
                this.alert = " "+ data.message_alert;
            }
        } else {
            this.alert = " can not be empty";
        }

        if(typeof data.sweetalert2 !== "undefined"){
            if(data.sweetalert2 == "" || data.sweetalert2 == null || data.sweetalert2 == false){
                this.sweetalert2    = false;
            } else {
                this.sweetalert2    = true;
            }
        } else {
            this.sweetalert2    = false;
        }
    }

    /* Step Button */
    to(numberTab){
        var param = (!isNaN(numberTab) && parseInt(Number(numberTab)) == numberTab && !isNaN(parseInt(numberTab, 10)))? numberTab.toString() : numberTab;
        var _ktab   = (param == 1)? 1 : eval(param) - 1;
        var post_form   = $(".ktab"+ _ktab +" input, .ktab"+ _ktab +" select, .ktab"+ _ktab +" textarea").serializeArray();
    
        var validate    = this.stepValidation(post_form, this.alert);
        
        if(validate.status == true){
            return this.kformStep(param);
        } else {
            if(this.sweetalert2){
                return Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    html: validate.message,
                    iconColor: "#dc3545",
                    confirmButtonText: "close",
                    confirmButtonColor: "#dc3545"
                });
            } else {
                return alert(validate.message);
            }
        }
    }
    
    back(numberTab){
        var param = (!isNaN(numberTab) && parseInt(Number(numberTab)) == numberTab && !isNaN(parseInt(numberTab, 10)))? numberTab.toString() : numberTab;
        this.kformStep(param);
    }

    finish(numberTab, form){
        var param = (!isNaN(numberTab) && parseInt(Number(numberTab)) == numberTab && !isNaN(parseInt(numberTab, 10)))? numberTab.toString() : numberTab;
        if(form == "" || form == null){
            alert("kForm Alert\n\nform not found, use ID to initialize the form");
        } else {
            if(!document.getElementById(form)){
                alert("kForm Alert\n\nform with id "+ form +" not found");
            } else {
                var post_form   = $(".ktab"+ param +" input, .ktab"+ param +" select, .ktab"+ param +" textarea").serializeArray();

                var validate    = this.stepValidation(post_form, this.alert);
                
                if(validate.status == true){
                    var thisForm = $("#"+ form);
                    if(typeof thisForm.attr("action") !== 'undefined'){
                        thisForm.trigger("submit");
                    } else return;
                } else {
                    if(this.sweetalert2){
                        return Swal.fire({
                            icon: "error",
                            title: "Oops!",
                            html: validate.message,
                            iconColor: "#dc3545",
                            confirmButtonText: "close",
                            confirmButtonColor: "#dc3545"
                        });
                    } else {
                        return alert(validate.message);
                    }
                }
            }
        }
    }

    /* Step System */
    kformStep(c){
        var tab
        if(c.indexOf("ktab") > 0){
            tab = c.split("ktab").join("");
        } else {
            tab = c;
        }

        var x, i;
        x = document.getElementsByClassName("kform");
        if (tab == "all") tab = "";
        for (i = 0; i < x.length; i++) {
            this.kformStepRemove(x[i], "kform-show");
            if (x[i].className.indexOf(tab) > -1) this.kformStepAdd(x[i], "kform-show");
        }
    }
    
    kformStepAdd(element, name){
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
        }
    }
    
    kformStepRemove(element, name){
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
            }
        }
        element.className = arr1.join(" ");
    }
        
    /* Step Validation */
    stepValidation(data, alert){
        var status, message, message_label, result = { status: true, message: "" };
    
        $.each(data, function(index){
            var initSelector    = $("[name='"+ data[index]['name'] +"']");
            var initValue       = data[index]['value'];
    
            if(!initSelector.attr("data-label") || initSelector.attr("data-label") == ""){
                message_label   = data[index]['name'];
            } else {
                message_label   = initSelector.data("label");
            }
    
            if(!initSelector.attr('data-required')){
                if(initValue.length == 0){
                    status          = false;
                    message         = alert.split("_FIELD_").join(message_label.split("_").join(" "));
                    result          = { status: status, message: message };
                }
            } else {
                if(initSelector.attr('data-required') !== "false"){
                    if(this.length == 0){
                        status          = false;
                        message         = alert.split("_FIELD_").join(message_label.split("_").join(" "));
                        result          = { status: status, message: message };
                    }
                }
            }
        });
    
        return result;
    }
}