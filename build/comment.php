<?php 
		$servername = "127.0.0.1:3306";
		$username = "root";
		$password = "";
		$database = "iq_hub_web";
		$connection = mysqli_connect($servername, $username, $password, $database);

		if (!$connection) {
		    die("Connection failed: " . mysqli_connect_error());
		}
		mysqli_set_charset($connection, "utf8");
		$sql = "SELECT * FROM comments";
		$result = $connection -> query($sql);		
		if($result -> num_rows > 0){
			echo '<div class="row first-row">';
			while($row = $result->fetch_assoc()){
				$img = $row["img"];
				$comment = $row["comment"];
				$name = $row["name"];
				$position = $row["position"];				
		    echo '
		    <div class="cols col-2">
		      <div class="comment-item">
		        <div class="image">
		         <img src="'.$img.'" alt="'.$name.'">
		       </div>
		       <q>'.$comment.'</q>
		       <p>'.$name.'</p>
		       <p>'.$position.'</p>
		     </div> <!-- /comment-item -->';
		     echo '
		    	</div>';				
			}
		}else{
			echo "Post not found";
		}
		$connection -> close();
	?>

