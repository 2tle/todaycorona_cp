
<?php
require '/workspace/todaycorona/Snoopy.class.php';
$snoopy = new Snoopy;
$snoopy->fetch('http://ncov.mohw.go.kr');
preg_match_all('/<span class="num">(.*?)<\/span>/', $snoopy->results, $text);
//var_dump($text[1]);
$t = str_replace(' 명','',$text[1][25]);
$dataArr = array();
$dataArr[0] = $t;
$dataArr[1] = $text[1][1];
$dataArr[2] = $text[1][2];
$dataArr[3] = $text[1][3];
preg_match_all('/<span class="before">(.*?)<\/span>/', $snoopy->results, $text);
//var_dump($text[1]);
$t = str_replace('전일대비 ','',$text[1][0]);
$dataArr[4] = $t;
$dataArr[5] = $text[1][1];
$dataArr[6] = $text[1][2];
$dataArr[7] = $text[1][3];
$sed = "";
for($i = 0;$i < 8;$i++) {
    if(!$dataArr[$i]) {exit;}
    $sed = $sed.$dataArr[$i].'@';
}
$myfile = fopen("todaycorona.txt", "w");
fwrite($myfile, $sed);
fclose($myfile);


?>