<?php
	
	//session_start();

    $highScore = (int) $_POST['highScore'];

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
		INSERT INTO highScore
		VALUES ('', :highScore, NOW())
	");
	
	$result -> execute(array("highScore" => $highScore));
	
	$result -> closeCursor();
		
	
?>