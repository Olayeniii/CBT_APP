const getInfo = () => {
    var getUrl = 'server.php';
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", getUrl,false);
        xmlhttp.send(null);
    }
        else{
            xmlhttp = newActiveXObject("Microsoft.XMLHTTP");
            xmlhttp.open("GET", getUrl, false);
            xmlhttp.send();
        }
        var data = xmlhttp.responseText;
        document.getElementById("display").innerHTML+= data;
        setTimeout("getInfo()", 2000);
}
getInfo();