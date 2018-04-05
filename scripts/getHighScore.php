<?php
	
	//session_start();

	/**
	 * Open database
	 */
	try {
		$bdd = new PDO('mysql:host=localhost;dbname=score;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	} catch (Exception $e) {
		die('Erreur : ' . $e -> getMessage());
	}
	
	
	/*
	 * Add score
	 */
	$result = $bdd -> prepare("
		SELECT MAX(highScore) as maxS
        FROM highscore
	");

	$result -> execute();
    $data = $result -> fetch();
    if (is_null($data['maxS']))
        echo 0;
    else
        echo $data['maxS'];

	$result -> closeCursor();
		
	
?>