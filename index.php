<?php

// var_dump($_GET);
// var_dump($_POST);
// var_dump($_SESSION);
// exit;

$error = '';
spl_autoload_register(function($class)
{
    require('models/'.$class.'.class.php');
});

session_start();

require('./config/config.php');

try
{
    $db = new PDO('mysql:dbname='.$config['bdd'].';host='.$config['host'], $config['login'], $config['password']);
}
catch (PDOException $e)
{
	require('views/errors500.phtml');
	die();
}

if (isset($_SESSION['id']))
{
	$page = 'content';
	$access = [ 'content'];
	// $ajax = [
	// 	'listMessage'=>'contollers/listMessage.php',
	// 	'footer'=>'contollers/footer.php'
	// ];
}
else
{
	$page = 'content';
	$access = [ 'content' , 'contact' ];
	// $ajax = [];
}
if (isset($_GET['page']))
{
	if (in_array($_GET['page'], $access ))
		$page = $_GET['page'];
	else if (isset($ajax[$_GET['page']])) {
		$page = $ajax[$_GET['page']];
	}
	else
	{
		header('Location: '.$page);
		exit;
	}
}

for($index=0;$index<sizeof($access);$index++){
	$active_page[$access[$index]] = '';
	$display_page[$access[$index]] = 'display-none';
}
$active_page[$page] = 'active';
$display_page[$page] = 'display-block';

if($page == $access[0]){
	$active_page[$access[1]] = 'active';
	$display_page[$access[1]] = 'display-block';
}
$page = $access[0];


$traitement_action = [
	'login' => 'User',
	'logout' => 'User',
	'create_Rubrique' => 'Rubrique',
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