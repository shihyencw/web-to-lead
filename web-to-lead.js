if (window.jQuery) {  
    // jQuery is loaded  
    // alert    ("Yeah!");
} else {
    // jQuery is not loaded
    // alert("Doesn't Work");
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js';
    // jqTag.onload = myJQueryCode; 
    headTag.appendChild(jqTag);            
}  

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return null;
};

class WebToLead {
    constructor(obj) {
      
        this.bu = obj.bu ? obj.bu : null;
        this.campaignName = obj.campaignName ? obj.campaignName : null;
        this.campaignType = obj.campaignType ? obj.campaignType : null;
        this.mkt = obj.mkt ? obj.mkt : null;
        this.agreementVer = obj.agreementVer ? obj.agreementVer : null;
        this.source = obj.source ? obj.source : null;
        this.note = obj.note ? obj.note : null;
        this.customer = obj.customer ? obj.customer : null;
        this.subBU = obj.subBU ? obj.subBU : null;
        this.campaignDate = obj.campaignDate ? obj.campaignDate : null;
        this.retURL = obj.retURL ? obj.retURL : null;
        this.divID = obj.divID ? obj.divID : "sf";
        this.formID = obj.formID ? obj.formID : "sfForm2";
        this.debug = obj.debug ? obj.debug : "0";
        this.fieldType = (obj.debug == "1") ? "text": "hidden";
        this.oid = "00D2w000006VPp6";
        this.requireFields = ["retURL", "oid", "last_name", "email", "mobile", "company", "00N2w00000Hh3IA", "00N2w00000Hh3Kk", "00N2w00000Hh3Kz", "00N2w00000Hh3NF", "00N2w00000Hh3MH", "00N2w00000Hh3MW", "00N2w00000Hh3C1" ]
        this.defaultFields = ["00N2w00000Hh3Mv", "00N2w00000Hh3M7", "00N2w00000HiIrE", "00N2w00000Hh3Ld", "00N2w00000Hh3LO", "00N2w00000Hh3MR","00N2w00000Hh3BS","phone","title","00N2w00000Hh3MM","00N2w00000Hh3Ls", "00N2w00000Hka6z","00N2w00000DOPqA"]

        this.buildFields();
        this.initCampaignVariables();

    }

    initCampaignVariables(){
        $("#oid").val(this.oid);
        $("#retURL").val(this.retURL);
        $("#00N2w00000Hh3IA").val(this.bu);
        $("#00N2w00000Hh3MH").val(this.campaignName);
        $("#00N2w00000Hh3MW").val(this.campaignType);
        $("#00N2w00000Hh3NF").val(this.mkt);
        $("#00N2w00000Hh3Kk").val(this.agreementVer);
        $("#00N2w00000Hh3M7").val(this.source);
        $("#00N2w00000Hh3Mv").val(this.note);
        $("#00N2w00000Hh3Ld").val(this.customer);
        $("#00N2w00000Hh3LO").val(this.subBU);
        $("#00N2w00000Hh3MM").val(this.campaignDate);
        var d = new Date();
        var Date00N2w00000Hh3C1 = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var Date00N2w00000Hh3Kz = (d.getFullYear() + 2) + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        $("#00N2w00000Hh3C1").val(Date00N2w00000Hh3C1);
        $("#00N2w00000Hh3Kz").val(Date00N2w00000Hh3Kz);     

    }
    buildFields() {
        if($("#" + this.divID).length == 0){
            $("body").append("<div id=\"{0}\"></div>".format(this.divID))
        }

        $("#" + this.divID).html("<form action=\"https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8\" method=\"POST\" id=\""+ this.formID + "\"/>")
        for (let field of this.requireFields) {
            $("#" + this.formID).append("<input id=\"{0}\" name=\"{0}\" type=\"{1}\"/> ".format(field, this.fieldType));
        }
        for (let field of this.defaultFields) {
            $("#" + this.formID).append("<input id=\"{0}\" name=\"{0}\" type=\"{1}\"/> ".format(field, this.fieldType));
        }
        if(this.debug == "1"){
            $("#" + this.formID).append("<input id=\"debug\" name=\"debug\" type=\"text\" value=\"1\" /> ");
            $("#" + this.formID).append("<input id=\"debugEmail\" name=\"debugEmail\" type=\"text\" value=\"\" /> ");
        }
    }
    setVariable(f, v) {
        if(f == 'agreementVer'){
            $('#00N2w00000Hh3Kk').val(v);
        }
        if(f == 'mkt'){
            $('#00N2w00000Hh3NF').val(v);
        }
        if(f == 'pr'){
            $('#00N2w00000HiIrE').val(v);
        }                
        if(f == 'industry'){ 
            $('#00N2w00000Hh3BS').val(v);
        }
        if(f == 'phone'){
            $('#phone').val(v);
        }
        if(f == 'workPlace'){
            $('#00N2w00000Hh3Ls').val(v);
        }
        if(f == 'company'){
            $('#company').val(v)
        }
        if(f == 'last_name'){
            $('#last_name').val(v);
        }
        if(f == 'email'){
            $('#email').val(v);
        }
        if(f == 'mobile'){
            $('#mobile').val(v);
        }
        if(f == 'campaignZone'){
            $('#00N2w00000Hh3MR').val(v);
        }
        if(f == 'campaignDate'){
            $('#00N2w00000Hh3MM').val(v);
        }        
        if(f == 'title'){
            $('#title').val(v);
        }
        if(f == 'account'){
            $('#00N2w00000Hka6z').val(v);
        }
        if(f=='orderInfo'){
            $('#00N2w00000DOPqA').val(v);
        }
    }
    submit(){
        var result = this.checkValue();
        if(result){
            $('#' + this.formID).submit();
        }
        return false;
    }
    checkValue(){
        var msg = [];
        
        if($("#last_name").val() == ""){
            msg.push("Last name required.");
        }
        if($("#mobile").val() == ""){
            msg.push("Mobile required.");
        }
        if($("#00N2w00000Hh3MH").val() == ""){
            msg.push("Campaign Name required.");
        }
        if($("#00N2w00000Hh3C1").val() == ""){
            msg.push("Campaign acquire date required.");
        }
        if($("#00N2w00000Hh3Kz").val() == ""){
            msg.push("Campaign list due date required.");
        }

        if($("#00N2w00000Hh3IA").val() == ""){
            msg.push("Acquire bu required.");
        }
        if($("#00N2w00000Hh3MH").val() == ""){
            msg.push("Campaign Name required.");
        }
        
        if(msg.length > 0){
            console.log("ERROR: " + msg.join("\n"));
            return false;
        }else{
            return true;
        }
    }
    bindDOM(id1, id2) {
        const e1 = document.getElementById(id1);
        const e2 = document.getElementById(id2);
        e1.addEventListener('input', function(event) {
            e2.value = event.target.value;
        });
        e2.addEventListener('input', function(event) {
            e1.value = event.target.value;
        });
    }               
}
