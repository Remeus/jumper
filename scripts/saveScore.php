<?php
	
	//session_start();

    $score = (int) $_POST['score'];

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
		INSERT INTO score
		VALUES ('', :score, NOW())
	");
	
	$result -> execute(array("score" => $score));
	
	$result -> closeCursor();
		
	
?>