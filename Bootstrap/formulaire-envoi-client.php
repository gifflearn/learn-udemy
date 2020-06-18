<?php
include_once 'fonctions/fonction-encodage-linux.php';
include_once 'fonctions/fonction-envoi-email-phpmailer.php';
include_once 'fonctions/fonction-formate-civilite.php';
include_once 'fonctions/fonction-formate-genre.php';
include_once 'classes/phpmailer/class.phpmailer.php';
$erreur = 0;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Partie 1) Recuperation données client(s)
if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES' && $_SESSION['acces_reception_coupon']){
	//---------- Logisneuf Privilèges ----------
	$id_client = $_POST['client'];
	// #############################
	// il faut detecter si liste contact > 0 
	$ids_client=array();
	foreach ($_POST['client'] as $clientid)
		$ids_client[]=$clientid;
	// ###########################
	//if(empty($id_client) && $_POST['contact'] == "interne") {
	if((count($ids_client)==0) && $_POST['contact'] == "interne") {
		$erreur_client = 1 ; $erreur ++; echo 'Erreur : client non trouvé !'; exit();
	}	else {
		// ## faire un foreach sur les elements du tableau $ids_client
		// pour construire un tableau $clients_data
		//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		if($_POST['contact'] == "interne"){
			// On se connecte à la BDD du réseau
			include('bdd-connexion.php');			
			// On cherche les données du client
		//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Début de la boucle	
			$sql = 'SELECT '.
									'Civilité AS civilite_client, '.
									'Nom AS nom_client, '.
									'Prenom AS prenom_client, '.
									'Ville AS ville_client, '.
									'Mail AS email_client, '.
									'Telephone AS telephone_client, '.
									'Cle_Unique_Locale AS id_client_argus '.
								'FROM '.
									'Internautes '.
								'WHERE '.
									'IDInternautes = '.$id_client;
			if ($result = mysqli_query($cnx, $sql)) {
				while ($ligne = mysqli_fetch_array($result)) {
					$civilite_client = formate_civilite($ligne['civilite_client']);
					$nom_client = $ligne['nom_client'];
					$prenom_client = $ligne['prenom_client'];
					$ville_client = $ligne['ville_client'];
					$email_client = trim($ligne['email_client']);
					$telephone_client = $ligne['telephone_client'];
					$id_client_argus = $ligne['id_client_argus'];
				}
			}
		//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Fin de la boucle	
			// On se déconnecte de la BDD du réseau
			include('bdd-deconnexion.php');
		}elseif($_POST['contact'] == "externe"){  // Dans ce cas le tableau $clients_data aura une taille de 1
		 	$civilite_client = formate_civilite($_POST['civilite_client']);
			$nom_client = $_POST['nom_client'];
			$prenom_client = $_POST['prenom_client'];		
			$ville_client = $_POST['ville_client'];
			$email_client = trim($_POST['email_client']);				
			// nom client
			if(empty($nom_client)) {$erreur_client = 1 ;$erreur ++; echo 'Erreur : nom du client vide !'; exit();}
			// prénom client
			if(empty($prenom_client)) {$erreur_prenom_client = 1 ;$erreur ++; echo 'Erreur : prénom du client vide !'; exit();}
			// ville client
			if(empty($ville_client)) {$erreur_ville_client = 1 ;$erreur ++; echo 'Erreur : ville du client vide !'; exit();}
		}
	}

	// fin de la constitution du tableau contact $clients_data
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	// Attention au formulaire : le multi-envoi n'est que pour LOGISNEUF 
	//
	// Dans le cas "autre reseau" le tableau $clients_data aura une taille de 1
} else {	//---------- Autres réseaux ----------- 
	$civilite_client = formate_civilite($_POST['civilite_client']);
	$nom_client = $_POST['nom_client'];
	$prenom_client = $_POST['prenom_client'];		
	$ville_client = $_POST['ville_client'];
	$email_client = trim($_POST['email_client']);				
	// nom client
	if(empty($nom_client)) {$erreur_client = 1 ;$erreur ++; echo 'Erreur : nom du client vide !'; exit();}
	// prénom client
	if(empty($prenom_client)) {$erreur_prenom_client = 1 ;$erreur ++; echo 'Erreur : prénom du client vide !'; exit();}
	// ville client
	if(empty($ville_client)) {$erreur_ville_client = 1 ;$erreur ++; echo 'Erreur : ville du client vide !'; exit();}
} 
// Fin recup données client(s)
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Partie 2) Récuperation données vendeur
$portable_utilisateur = $_POST['portable_utilisateur'];
$visio_utilisateur = $_POST['visio_utilisateur'];

//##############################################
// email client
//= A DEPLACER
if(!filter_var($email_client, FILTER_VALIDATE_EMAIL) || (empty($email_client))){ $erreur_email_client = 1 ;$erreur ++; echo 'Erreur : email du client non valide : "'.$email_client.'"' ; exit();}
//###############################################


// tel utilisateur
$tel_utilisateur = $_POST['tel_utilisateur'];	
if(empty($tel_utilisateur) && empty($portable_utilisateur)) {$erreur_tel_utilisateur = 1 ;$erreur ++; echo 'Erreur : téléphone du vendeur non valide !'; exit();}
// email utilisateur
$email_utilisateur = $_POST['email_utilisateur'];
$plans_logements2 = "";
if(!filter_var($email_utilisateur, FILTER_VALIDATE_EMAIL) || (empty($email_utilisateur))){ $erreur_email_utilisateur = 1 ;$erreur ++; echo 'Erreur : email du vendeur non valide !'; exit();}
// objet
$objet = $_POST['objet'];	
if(empty($objet)) {$erreur_objet = 1 ;$erreur ++; echo 'Erreur : objet de l\'email vide !'; exit();}else
{$objet = stripslashes($_POST['objet']);}
// portable
if (!empty($portable_utilisateur)) {
$telephones_utilisateur = 'Téléphone : <strong>'.$tel_utilisateur.'</strong><br />Portable : <strong>'.$portable_utilisateur.'</strong>';
} else {
$telephones_utilisateur = 'Téléphone : <strong>'.$tel_utilisateur.'</strong>';
}
// message
$message = $_POST['message'];	
// recipissé
$recepisse = $_POST['recepisse'];
if ($recepisse == 'oui') {$recepisse = 1;} else {$recepisse = 0;}
// envoi des prix
$envoi_prix = $_POST['envoi_prix'];
// envoi des pdf
$envoi_pdf = $_POST['envoi_pdf'];



//Partie 3) Documents : identiques pour tous les destinataires
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//---------- Documents envoyés ----------
// plan (vignette)
/*
* @param $tmp[0] descriptif du lot 
* @param $tmp[1] plan(s) des lots séléctionnés
* @param $tmp[2] id des lots séléctionnées  
*/
$liste_plans_pdf = '';
$matrice_plans = array();
$tableau_infos_vignettes = $_POST['vignette'];
$passage = 0;

if (!empty($tableau_infos_vignettes)) {	
	$nb_logements_checked = count($tableau_infos_vignettes);
	foreach ($tableau_infos_vignettes as $infos_vignette) {
		$tmp = explode("##", $infos_vignette);
		//on ajoute l'id des lots et leurs plans dans un tableau pour l'envoi du mail		
		$matrice_plans[$passage] =  array($tmp[2], $tmp[1]);	
		$tableau_vignettes = explode("||", $tmp[1]);
		if (count($tableau_vignettes) > 1) {
			$nb_vignettes = 0;
			$liste_liens_vignettes = '';
			foreach ($tableau_vignettes as $vignette) {
				$nb_vignettes ++;
				$liste_liens_vignettes .= ' <a href="'.$vignette.'" target="_blank">plan '.$nb_vignettes.'</a>';
			}
			$liste_plans_pdf .= '<li>'.$tmp[0].' : '.$liste_liens_vignettes.'</li>'."\r\n";
		} else {
			$liste_plans_pdf .= '<li><a href="'.$tmp[1].'?t='.time().'" target="_blank">'.$tmp[0].'</a></li>';
		}		
		$passage++;
	}
}

// documents
$liste_documents_programme = '';
$tableau_documents = $_POST['doc'];
if (!empty($tableau_documents)) {
	foreach ($tableau_documents as $doc) {
		$tmp = explode("##", $doc);
		$chemin_plan = encodage_linux($tmp[1]);
		$liste_documents_programme .= '<li><img src="http://new.logissimmo.com/images/icones/pdf_petit.gif" style="vertical-align:middle; margin-right:5px" alt=""><a href="http://medias.logissimmo.com/'.$chemin_plan.'?t='.time().'" target="_blank">'.$tmp[0].'</a></li>';
	}
}

// Listes des documents envoyés
if (!empty($liste_plans_pdf) || !empty($liste_documents_programme)) {
	$liste_documents_envoyes = '<ul>'.$liste_plans_pdf.$liste_documents_programme.'</ul>';
} else {
	$liste_documents_envoyes = '';
}
if (!empty($liste_plans_pdf)) {$liste_plans_pdf = '<ul>'.$liste_plans_pdf.'</ul>';}
if (!empty($liste_documents_programme)) {$liste_documents_programme = '<ul style="list-style-type: none; ">'.$liste_documents_programme.'</ul>';}

//---------- Pièces jointes ----------
// id du lot
$id_lot = $_POST['id_lot'];
// document joint
$nom_du_fichier = $_FILES['uploadFile']['name'];
$type_du_fichier = $_FILES['uploadFile']['type'];
$chemin_tmp_fichier = $_FILES['uploadFile']['tmp_name'];
$taille_du_fichier = $_FILES['uploadFile']['size'];
//taille supérieur à 7 méga
if($taille_du_fichier > 7500000) {$erreur_fichier = 1 ;$erreur ++;  echo 'Erreur : pièce jointe trop volumineuse !'; exit();}
// Fin envoi document
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// Partie 4 : Préparation envoie email
// Recup des données programmes 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if($erreur==0){
	// On va pouvoir envoyer le mail
	include_once('classes/lot.php');	
	// On récupère les données du programme
	$lot2 = new LotSeb($id_lot);
	$lot_donnees = $lot2->getAllVars();
	$ref_programme = $lot2->getVars('num_dossier');
	$nom_commercial = $lot2->getVars('nom_commercial');
	$nom_promoteur = $lot2->getVars('nom_promoteur');
	$nom_ville = $lot2->getVars('nom_ville');
	$code_postal = $lot2->getVars('code_postal');
	$fiscalite = $lot2->getVars('fiscalite');
	$sous_fiscalite = $lot2->getVars('sous_fiscalite');
	$photo_programme_envoi_lot = $lot2->getVars('photo_programme_envoi_lot');
	$zone_fiscale = $lot2->getVars('zone_fiscale');
	$descriptif_programme = $lot2->getVars('descriptif_programme');
	$date_livraison_programme = $lot2->getVars('date_livraison_programme');
	$descriptif_complementaire_programme = $lot2->getVars('descriptif_complementaire_programme');	
	//format le descriptif
	$descriptif_programme = '<p class="formate">'.str_replace(CHR(13).CHR(10).CHR(13).CHR(10),"</p>\r\n<p class='formate'>",$descriptif_programme).'</p>';		
	// Fiscalité
	if ($fiscalite == 'SCELLIER') {$fiscalite = 'DUFLOT';}			
	// Logisneuf Privilèges
	if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES' && $_POST['contact'] == "interne") {
		$nom_programme =  '';
		$nom_programme_recepisse =  $nom_commercial;
		$promoteur =  '<li>Promoteur : <strong>'.$nom_promoteur.'</strong></li>';
	} else {
		$nom_programme = '<br /><strong>'.$nom_commercial.'</strong>';
		$nom_programme_recepisse =  $nom_commercial;
		$promoteur =  '';
    }
	

 // Partie 5 : Entete du message   
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	//---------- Email ----------
	$destinaires_bcc = $_POST['mail_copie'].',';
 	if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES') { // Logisneuf Privilèges
		$destinaires_bcc .= EMAIL_ADMIN;
		$tab_destinataires_bcc = explode(',',$destinaires_bcc);
		$objet = 'Logisneuf : '.$objet;
	} else { // Autres réseaux
		$destinaires_bcc .= EMAIL_ADMIN;
		$tab_destinataires_bcc = explode(',',$destinaires_bcc);
	}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DEBUT DE LA BOUCLE   
// Démarrage de la boucle sur le tableau contact

	// On formate l'email client en tableau
	$tab_email_client = explode(',',$email_client);	
	
	
	
	// Partie 6: On formate le message
	// Attention : utiliser autre chose que les variables de sessions pour les données vendeurs
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	$message_html = '<html>
	<table style="width:700px; font-family:Verdana; font-size:12px;" cellpadding="0" cellspacing="0">
		<tr>
			<td width="350" valign="top"><u>Destinataire :</u><br /><strong>'.$nom_client.'</strong> '.$prenom_client.'<br />';			
	if($_SESSION['societe_utilisateur'] != 'LOGISNEUF PRIVILEGES' || $_POST['contact'] == "externe"){				
		if(!empty($telephone_client)) $message_html .= 'Telephone : '.$telephone_client.'<br />';
		if(!empty($ville_client)) $message_html .= 'Ville : '.$ville_client.'<br />';
		if(!empty($email_client)) $message_html .= 'E-mail : '.$email_client.'<br />';
	}
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% partie commune à sortir de la boucle
	// 
	$message_html .= '<br /></td>
	<td width="350" valign="top" align="right"><u>';
	if($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES') {
		$message_html .= 'Correspondant Logisneuf';
	}else {$message_html .= 'Expéditeur';}
	$message_html .= ' :</u><br />'.$_SESSION['civilite_utilisateur'].
	' <strong>'.$_SESSION['nom_utilisateur'].'</strong> '.
	$_SESSION['prenom_utilisateur'].'<br />	'.
	$telephones_utilisateur.'<br />E-mail : '.$email_utilisateur.'<br />Visio : '.$visio_utilisateur.'<br /></td></tr></table><br />'.
	nl2br(stripslashes(str_replace('€','&euro;',$message))).'<br /><br />'.
 '<hr /><div style="color:#cc0000; text-align:center">INFORMATIONS SUR LE PROGRAMME</div><hr /><br />'.
 '<table style="width:700px; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px;" cellpadding="0" cellspacing="0">
				<tr>
						<td width="50%" valign="top" style="padding-left:10px;">
						Programme neuf à <strong>'.$nom_ville.'</strong> ('.$code_postal.') : '.$nom_programme.'<br />
						Fiscalité : <strong>'.$sous_fiscalite.'</strong><br />
						Zone fiscale : <strong>'.$zone_fiscale.'</strong><br />
						'.$date_livraison_programme.'
						<br /><br />';
	if (!empty($tableau_documents)) {
		$message_html .= '<u>Liste des documents :</u><br />'.
											$liste_documents_programme;
	}
	$message_html .= '</td>													
					<td width="50%" valign="top" style="padding-left:10px;">'.$photo_programme_envoi_lot.'</td>
				</tr>
	</table>
    <hr /><div style="color:#cc0000;">DESCRIPTIF DU PROGRAMME :</div><hr />'.$descriptif_programme;	
    
    
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// On est toujours dans la boucle 
	// Partie 6 : descriptif complementaires
	if (!empty($descriptif_complementaire_programme) && $descriptif_complementaire_programme != '-') { 
	$message_html .= '<br /><div style="color:#cc0000;">DESCRIPTIF COMPLÉMENTAIRE :</div><br />'.$descriptif_complementaire_programme.'<br /><br />';
	}	
	//pour chaque lot sélectionné on affiche le descriptif qui convient
	for($i=0; $i<count($matrice_plans); $i++){
		// On récupère les données de chaque lot
		$tab_id_image = $matrice_plans[$i];	
		$lot3 = new LotSeb($tab_id_image[0]);
		$lot_donnees = $lot3->getAllVars();
		$ref_lot = $lot3->getVars('ref_lot');
		$numero = $lot3->getVars('numero');
		$genre = $lot3->getVars('genre');
		$type = $lot3->getVars('type');
		$numero_lot = $lot3->getVars('numero_lot_unique');
		$etage = $lot3->getVars('etage');
		$exposition = $lot3->getVars('exposition');
		$liste_html_surfaces = $lot3->getVars('liste_html_surfaces');
		$option = $lot3->getVars('option');
		$liste_prix = $lot3->getVars('liste_prix');
		$lmp_prix_total_ht = $lot3->getVars('lmp_prix_total_ht');
		$lmp_prix_total_ttc = $lot3->getVars('lmp_prix_total_ttc');	
		$plan_1 = $lot3->getVars('plan_1');
		$plan_1 = $lot3->getVars('plan_1');
		$plan_2 = $lot3->getVars('plan_2');
		$plan_3 = $lot3->getVars('plan_3');
		$plan_4 = $lot3->getVars('plan_4');
		$plan_5 = $lot3->getVars('plan_5');
		$stationnement = $lot3->getVars('stationnement');
		$date_livraison = $lot3->getVars('date_livraison');
		$notes = $lot3->getVars('notes');
		//-----------------------------------
		$loyer_1 = $lot3->getVars('loyer_1').' &euro;';		
		$cave = $lot3->getVars('cave');
		$prix_cave = $lot3->getVars('prix_cave');
		$prix_stationnement_1 = $lot3->getVars('prix_stationnement_1');
		$prix_stationnement_2 = $lot3->getVars('prix_stationnement_2');
		// Si on envoie les plans pdf
		if ($envoi_pdf == 'oui') {$plan_pdf = $lot3->getVars('plan_pdf_email');} else {$plan_pdf = '';}				
		// Logisneuf Privilèges
		if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES') {
			$nom_lot =  $ref_lot;
			$lot_recepisse =  $numero;
		} else {
			$nom_lot =  $numero;
			$lot_recepisse =  $numero;
		}					
		// Si on envoie les prix
		if (!empty($envoi_prix)) {
			// On formate le prix
			if ($fiscalite == 'LMP/LMNP') { // LMP/LMNP
				$infos_prix = '<ul>
				<li>Prix total HT : <strong>'.formate_nombre($lmp_prix_total_ht,0).' &euro;</strong></li>';
				$infos_prix .= '<li>Prix total TTC : <strong>'.formate_nombre($lmp_prix_total_ttc,0).' &euro;</strong></li>';
				if(!empty($loyer_1) && $loyer_1 != 0){
					$infos_prix .= '<li>Loyer marché estimé : <strong>'.$loyer_1.'</strong></li>';	
				}
				$infos_prix .= '</ul>';
			} else { // Autres fiscalités
				if(!empty($loyer_1) && $loyer_1 != 0){
					$loyer_marcher = '<li>Loyer marché estimé : <strong>'.$loyer_1.'</strong></li>';	
				}else{$loyer_marcher = '';}
				$infos_prix = '<ul>'.$liste_prix.$loyer_marcher.'</ul>';
			}	
			//on formate le prix
			if(!empty($prix_cave) && $prix_cave != 0){$affiche_prix_cave = $prix_cave ;}
			if(!empty($prix_stationnement_1) && $prix_stationnement_1 != 0){
				$affiche_prix_stationnement_1 = $prix_stationnement_1 ;}
			if(!empty($prix_stationnement_2) && $prix_stationnement_2 != 0){
				$affiche_prix_stationnement_2 = $prix_stationnement_2 ;}
				
		} else {$infos_prix = '';}		
		
		$liste_plan = array($plan_1, $plan_2, $plan_3, $plan_4, $plan_5);
		//on verifie si il y a plusieurs plan pour un logement
		$tab_plan = explode( '||', $tab_id_image[1]);
		$passage2 = 2;
		if(count($tab_plan) > 1){					
			foreach($tab_plan as $value){
				$plans_logements .= '<a href="'.DOSSIER_IMAGES_PROGRAMMES.$liste_plan[$passage2-2].'">Plan '.($passage2-1).'</a>, ';
				$passage2++;
			}										
		}
		$plans_logements = substr($plans_logements,0, strlen($plans_logements) -2);			

		if ($genre === "Terrain") {
			$type = $etage = $exposition = "";
		}
		else {
			$etage = '<li>Étage : <strong>'.$etage.'</strong></li>';
			$exposition = '<li>Exposition : <strong>'.$exposition.'</strong></li>';
		}

		//couleur logement
		if($option == '<span class="vert">Disponible</span>') $couleur_logement = "#339900"; 
		if($option == '<span class="orange">Optionné</span>') $couleur_logement = "#ff9900"; 
		if($option == '<span class="rouge">Réservé</span>' || $option == '<span class="rouge">Vendu</span>') $couleur_logement = "#CC0000";		
		//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		// Partie 7 : Constitution du message : toujours dans la boucle dans la boucle
		// Tout ou partie
		$message_html .=
		'<br /><hr />
		<span style="color:'.$couleur_logement.'">LOGEMENT n° <strong>'.$numero_lot.' / RÉF. '.$nom_lot.' : '.$option.'</strong>'.$date_livraison.'</span><hr />
		<img src="'.DOSSIER_IMAGES_PROGRAMMES.$plan_1.'" border="0" style="border:1px solid #999; margin-top:15px" width="700" alt=""><br />
		<table width="700" border="0" cellspacing="0" cellpadding="0" style="font-family:Verdana; font-size:11px; border:1px solid #999">
			<tr style="background-color:#6b6b6b; color:#fff;">
				<td height="25" colspan="2" align="center">Fiche technique du logement réf. <strong>'.$nom_lot.'</strong></td>
			</tr>
			<tr style="background-color:#dfdfdf">
				<td width="350" valign="top">
					<ul style="padding:5px">
					 <li>Détails des surfaces : 
							<ul>'.$liste_html_surfaces.'</ul>
					 </li>						
					</ul>
				</td>
				<td width="350" valign="top">
				<ul style="padding:5px">'.						
						'<li>Type : <strong>'.$genre.' '.$type.'</strong></li>'.
						$etage.
						$exposition.													
					'</ul>
				</td>
			</tr>
			<tr style="background-color:#dfdfdf">
				<td width="350">'.$infos_prix.$plan_pdf.'</td>
				<td width="350">';
				if(count($tab_plan) > 1){ 
					$message_html .='<ul><li>Plans du logement : '.$plans_logements.'</li></ul>';}
				$message_html .='<ul>';
				if(!empty($stationnement)){
					$message_html .='<li>Stationnement(s) : <strong>'.$stationnement.'</strong></li>';}
				if(!empty($cave)){
					$message_html .='<li>Cave : <strong>'.$cave.'</strong></li>';}
				$message_html .='</ul>';
				$message_html .='</td></tr>';
				if(!empty($notes)){
					$message_html .='<tr>
					<td colspan="2" valign="top" style="padding:10px; background:#dfdfdf"><strong>Notes : '.$notes.'</strong></td></tr>';	}
		$message_html .= '</table>';
		//on tue la variable et l'objet pour la prochaine boucle
		unset($plans_logements);
		unset($lot3);
		$passage2=2;	
	}		
	$message_html .= '<table style="width:700px; font-family:Verdana; font-size:12px;" cellpadding="0" cellspacing="0">
	<tr>
		<td width="350" valign="top"></td>
		<td width="350" valign="top" align="right"><br /><br /><u>';
		if($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES'){
			$message_html .= 'Correspondant Logisneuf';} 
		else {$message_html .= 'Expéditeur';}
	$message_html .= ' :</u><br />
		'.$_SESSION['civilite_utilisateur']. '
		 <strong>'.$_SESSION['nom_utilisateur'].'</strong> '.
		 $_SESSION['prenom_utilisateur'].'<br />	'.
		 $telephones_utilisateur.'<br />													
		 E-mail : '.$email_utilisateur.'<br /></td>
	</tr>
</table>';		
    $message_html .= '<br /><br /></html>';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Fin de partie commune à sortir    
    
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Partie 8 :  Ca c'est l'envoi : à inclure dans la boucle
	$reponse_envoi_mail = envoi_email_phpmailer($objet, $message_html, $email_utilisateur, $tab_email_client, $tab_destinataires_bcc, $chemin_tmp_fichier,EMAIL_ABUSE,true,true);					

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// A inclure dans la boucle
// Partie 9 : constitution et envoi du recepissé
	//---------- Récépissé ----------
	// constitution et envoi
	if ($recepisse == 1) {
		if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES') { 	// Logisneuf Privilèges
			//on gere les destinataires
			$destinaires = $email_utilisateur;
			$tab_destinataires = explode(',',$destinaires);
			//on gere les destinataires Bcc
			$destinaires_bcc = EMAIL_ADMIN.','.EMAIL_ENVOI_CLIENT;
			$tab_destinataires_bcc = explode(',',$destinaires_bcc);
			// Objet
			if($_POST['contact'] == "interne"){
				$objet_recepisse = 'Récépissé : envoi à un client ('.$nom_client.' '.$prenom_client.') par '.$_SESSION['civilite_utilisateur']. ' '.$_SESSION['nom_utilisateur'].' '.$_SESSION['prenom_utilisateur'];
			}else{
				$objet_recepisse = 'Récépissé : envoi à un client externe ('.$nom_client.' '.$prenom_client.') par '.$_SESSION['civilite_utilisateur']. ' '.$_SESSION['nom_utilisateur'].' '.$_SESSION['prenom_utilisateur'];
			}			
		} else { // Autres réseaux %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  A sortir de là ?????
			//on gere les destinataires
			$destinaires = $email_utilisateur;
			$tab_destinataires = explode(',',$destinaires);
			//on gere les destinataires Bcc
			$destinaires_bcc = EMAIL_ADMIN;
			$tab_destinataires_bcc = explode(',',$destinaires_bcc);			
			// Objet
			$objet_recepisse = 'Récépissé : envoi à un client ('.$nom_client.' '.$prenom_client.') par '.$_SESSION['civilite_utilisateur']. ' '.$_SESSION['nom_utilisateur'].' '.$_SESSION['prenom_utilisateur'];
		}		
		// Message d'avertissement Privilèges
		if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES' && $_POST['contact'] == "interne") {
			$message_html .= '<br /><u>IMPORTANT</u> :<br />'."\r\n".
												'Nous avons bien noté que vous êtes en relation avec ce client/prospect.<br />'.
												'L\'utilisation de LOGISNEUF PRIVILEGES est réservée à nos partenaires, et vous oblige, en cas de réalisation, à nous transmettre la réservation quelle que soit l\'origine de ce client/prospect.
	En d\'autres termes, toutes les ventes réalisées à l\'aide de LOGISNEUF PRIVILEGES sont sous mandat C-Invest.<br />'.
												'Nous dégageons toute responsabilité en cas d\'utilisation frauduleuse, même partielle, de LOGISNEUF PRIVILEGES et nous nous réservons le droit d\'entamer les poursuites judiciaires nécessaires à la préservation de nos intérêts.';	
		}
		// Envoi de l'email
		envoi_email_phpmailer($objet_recepisse, $message_html, EMAIL_EXPEDITEUR, $tab_destinataires, $tab_destinataires_bcc, $chemin_tmp_fichier);
	}


    
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// A inclure dans la boucle ou à stocker pour faire une connexion base
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	//Partie 10  : ---------- Historique dans la BDD ----------
	// if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES' 
	// && $_SESSION['acces_reception_coupon'] 
	// && $_POST['contact'] == "interne") {
		if ($_SESSION['societe_utilisateur'] == 'LOGISNEUF PRIVILEGES'  
		&& $_SESSION['acces_reception_coupon'] ) {

		if (!isset($id_client_argus)) $id_client_argus = 0;		
		// On se connecte à la BDD du réseau
		include('bdd-connexion.php');			
		// Si aucun lot sélectionné [668]
		if (empty($ref_lot)) {$ref_lot = 0;}
		// si le client est externe
		if (empty($id_client)) { $id_client = $_POST['id_client_ext'];}		
		// On insère l'envoi à un client
		$sql = 'INSERT INTO envoi_client ('.
								'date_envoi, '.
								'id_vendeur, '.
								'id_contact, '.
								'id_contact_argus, '.
								'ref_programme, '.
								'ref_lot, '.
								'objet_email, '.
								'message_email, '.
								'documents_email, '.
								'recepisse_email, '.
								'tel_vendeur, '.
								'portable_vendeur, '.
								'email_vendeur'.
							') VALUES('.
								'NOW(), '.
								$_SESSION['id_utilisateur'].', '.
								$id_client.', '.
								$id_client_argus.', '.
								$ref_programme.', '.
								$ref_lot.', '.
								'"'.addslashes($objet).'", '.
								'"'.addslashes($message).'", '.
								'"'.addslashes($liste_documents_envoyes).'", '.
								$recepisse.', '.
								'"'.addslashes($tel_utilisateur).'", '.
								'"'.$portable_utilisateur.'", '.
								'"'.$email_utilisateur.'"'.
							')';
						//	echo $sql;
		if( !mysqli_query($cnx, $sql) ) {
			$error = mysqli_error($cnx);
			mail("technique@european-soft.com", $_SERVER['REMOTE_ADDR'] . " Erreur d'envoi client.", "Erreur d'envoi client $id_client. Erreur: $error $sql");
		}


	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FIN DE LA BOUCLE
		// On se déconnecte de la BDD du réseau
		include('bdd-deconnexion.php');		
	}
}
?>