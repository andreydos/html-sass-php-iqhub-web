<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Registration data</title>
</head>
<body>
	<?php 	
		if(isset($_POST["name"])){
			$name = $_POST["name"];
			echo "<div>Name: ".$name."</div>";
		}	
		if(isset($_POST["mail"])){
			$mail = $_POST["mail"];
			echo "<div>Email: ".$mail."</div>";
		}
		if(isset($_POST["message"])){
			$message = $_POST["message"];
			echo "<div>Message: ".$message."</div>";
		}
	?>
</body>
</html>