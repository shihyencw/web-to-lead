# Salesforce web to lead document

Salesforce 線上商機 JS 包，提供線上表單建置，送出後會成為SVC個案，若資料不符合CRM特徵，則會建立一個潛客，故需要蒐集個資聲明、行銷意願以及可使用日期等參數。

## Overview
1. 所有欄位採用隱藏方式建立(input[type=hidden])，前端收集資訊後以setVariable(欄位, 值)的方式賦值後送出表單
2. 可使用自行設計的表單、欄位，但不可使用以下保留的欄位id: phone, title, company, last_name, email, mobile，以免賦值時錯亂

## Fields

表單欄位說明，以及DOM id參考清單。Parameter欄位供setVariable使用，DOM id供bindDOM()使用。

Input參數說明：
1. user: 表示從網頁上蒐集使用者資訊而來，不建議帶預設值，如果不想收集，送出前設為空白
2. config: 表示在設定檔中設定，使用者不得修改，否則就不會進入Salesforce系統
3. default: 由系統自行設定


|Label|Parameter|DOM id|Required|input|
|--|--|--|:--:|--|
|姓名|last_name|last_name|v|user|
|行動電話|mobile|mobile|v|user|
|Email|email|email|v|user|
|公司|company|company|v|user|
|職稱|title|title|v|user|
|同意個資聲明|agreementVer|00N2w00000Hh3Kk|v|user|
|同意行銷|mkt|00N2w00000Hh3NF|v|user|
|電話|phone|phone||user|
|活動日期|campaignDate|00N2w00000Hh3MM||user|
|活動區域|campaignZone|00N2w00000Hh3MR||user|
|從事行業|industry|00N2w00000Hh3BS||user|
|任職單位名稱|division__c|00N2w00000Hh3Ls||user|
|會員帳號|account|00N2w00000Hka6z| |user|
|訂單資訊|orderInfo|00N2w00000DOPqA| |user|
|名單取得日|-|00N2w00000Hh3C1|v|default|
|名單到期日|-|00N2w00000Hh3Kz|v|default|
|活動名稱|campaignName|00N2w00000Hh3MH|v|config|
|取得BU|bu|00N2w00000Hh3IA|v|config|
|subBU|subBU|00N2w00000Hh3LO| |config|
|名單來源|source|00N2w00000Hh3M7|v|config|
|廣告客戶名稱|customer|00N2w00000Hh3Ld|v|config|
|活動類型|campaignType|00N2w00000Hh3MW|v|config|
|備註|note|00N2w00000Hh3Mv|v|config|
|是否為公關票|pr|00N2w00000HiIrE||config|
|送出後跳轉頁面|retURL||v|config|
|開發模式|debug|||config|

欄位補充說明：
1. 是否為公關票: 0:否 1:是
2. 開發模式: 1: 網頁上會顯示參數的欄位，送出後不會導轉頁面，顯示送出的參數內容。
3. 名單取得日: 預設為當天, 名單到期日: 預設為2年後
4. 同意個資聲明、同意行銷不可預設為同意，需經過使用者操作後才能確認其意向

## functions

web to lead Class 功能說明

- [bindDOM()](#binddomid1-id2)
- [setVaraible()](#setvariableparameter-value)
- [submit()](#submit)


### bindDOM(id1, id2)

綁定DOM

```javascript
const config = {}
var wtl = new WebToLead(config);
wtl.bindValues('id1','id2');
wtl.bindValues('user_name','last_name');
```
依據 DOM id 進行two-way binding，便於將使用者輸入的表單資料綁定到實際送出的欄位上。

#### Paramaters

##### - id1
自訂表單欄位的DOM id

##### - id2
Web-to-lead欄位的DOM id，參考 Fields 說明

<hr>

### setVariable(Parameter, Value)

設定參數。

```javascript
const config = {}
var wtl = new WebToLead(config);
wtl.setVariable("Parameter", "Value");
wtl.setVariable("campaignZone", "舞台A區");
```
依據 DOM id 進行two-way binding，便於將使用者輸入的表單資料綁定到實際送出的欄位上。

#### Paramaters

##### - Parameter
Web-to-lead欄位的Parameter，可使用的參數，請參考 Fields[input=user]的參數名稱。

##### - Value
線上蒐集到的使用者資訊

<hr>

### submit()

送出表單。
```html
<button type="button" class="submitbtn" id="submit">
    送出
</button>
```

```javascript
$('#submit').click(function(){
    wtl.setVariable("phone", "0912345678");
    wtl.setVariable("industry", "從事行業");
    wtl.setVariable("workPlace", "社區大學總務處");
    wtl.setVariable("account", "shihyen@cw.com.tw");
    wtl.submit();
});
```
呼叫wtl，將建立的salesforce表單資訊送出，wtl實體需要事先建立。
建議用自行建立的button事件觸發。

## Example

1. head 區塊導入web-to-lead.min.js
```html
<script src="web-to-lead.min.js"></script>
```

2. body 區塊建立使用者表單

```html
名字: <input id="user_name" maxlength="40" name="user_name" size="20" type="text" /><br>
電子郵件: <input id="user_email" maxlength="80" name="user_email" size="20" type="text" /><br>
行動電話: <input id="user_mobile" maxlength="40" name="user_mobile" size="20" type="text" /><br>
<input type="checkbox" name="policy" value="yes" id="policy"> 我已詳閱並同意個資聲明 <br>
個資聲明...(略)<br>
<button type="button" class="submitbtn" id="submit">
    送出
</button>
```
3. body建立<script></script>區塊，內容範例：

- 建立活動設定檔
```javascript
const config = {
    "debug": "1",
    "bu": "天下",
    "subBU": "電商",
    "source": "廣告活動",
    "customer": "林務局",
    "campaignName": "測試活動",
    "campaignType": "藝術人文",
    "campaignDate": "2021/1/1",
    "retURL": "https://www.google.com.tw/",
    "mkt": "待確認",
    "agreementVer": "無",
    "note": getUrlParameter('note') ? getUrlParameter('note') : null,
}   
```

- 設定WTL表單參考
```javascript
window.onload = function(){
    var wtl = new WebToLead(config);
    wtl.setVariable("pr", "0");

    wtl.bindDOM('user_name','last_name');
    wtl.bindDOM('user_mobile','mobile');
    wtl.bindDOM('user_email','email');

    $('#submit').click(function(){
    
        wtl.setVariable("workPlace", "社區大學總務處");
        wtl.setVariable("title", "會計");
        wtl.setVariable("account", "shihyen@cw.com.tw");

        wtl.submit();
    });
    $('body').on('change', '#policy', function () {
        if ($('#policy').is(':checked')) {
            wtl.setVariable("agreementVer", "A版");
            wtl.setVariable("mkt", "同意");
        } else {
            wtl.setVariable("agreementVer", "無");
            wtl.setVariable("mkt", "不同意");
        }
    });
};   
```
