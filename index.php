<?php

// var_dump($_GET);
// var_dump($_POST);
// var_dump($_SESSION);
// exit;

// $input_error="";

// ________ OVH-DEBUG ________

// ini_set('display_errors',1);

// ________ SESSION ________

session_start();

// ________ AUTOLOADER ________

spl_autoload_register(function($class)
{
    require('models/'.$class.'.class.php');
});

// ________ CONFIGURATION ________

require('./config/dbConfig.php');
require('./config/globalConfig.php');

// ________ DATABASE ________

try
{
    $db = new PDO('mysql:dbname='.$config['bdd'].';host='.$config['host'], $config['login'], $config['password']);
}
catch (PDOException $e)
{
	require('views/errors500.phtml');
	die();
}

// ________ HUB ________

$page = 'content';
$access = [ 'content', 'contact', 'sendmailsuccess'];
$ajax = [
	'contact'=>'apps/contact_error.php',
	'error'=>'apps/error.php',
];

if (isset($_GET['page']))
{
	if ( in_array($_GET['page'], $access) && !isset($_GET['ajax'])  )
		$page = $_GET['page'];
	else if ( isset($ajax[$_GET['page']]) ) {
		$page = $ajax[$_GET['page']];
	}
	else
	{
		header('Location: '.$page);
		exit;
	}
}

// ________ ROUTAGE ONEPAGE ________

for($i=0;$i<sizeof($access);$i++){
	$display_page[$access[$i]] = 'display-none';
}
$display_page[$page] = 'display-block';
if (!isset($_GET['ajax']))
	$page = $access[0];

// ________ TRAITEMENT ________

$traitement_action = [
	'send_mail' => 'Mail',
];
if (isset($_POST['action'])) 
{
	$action = $_POST['action'];
	if (isset($traitement_action[$action])) 
	{
		$value = $traitement_action[$action];
		require('apps/traitement'.$value.'.php');
	}
}


if (!isset($_GET['ajax']))
	require('apps/skel.php');
else
	require($page);

?>