<?php
	$fields = ['name','email','subject','message'];
    $values = [];
    foreach($fields as $field){
        if (!isset($_SESSION[$field]))
        	$_SESSION[$field] = "";
    }
	require('views/contact.phtml');
?>