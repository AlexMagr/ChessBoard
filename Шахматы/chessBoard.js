function chessBoard(){
	"use strict";
		var chess=['Rook_','Knight_','Bishop_','King_','Queen_','Bishop_','Knight_','Rook_','Pawn_'];
		
		var wrapp_big=document.createElement('div');
		wrapp_big.className='wrapp_big';
		//wrapp_big.innerHTML='<div onkeydown=console.log(event.keyCode);></div>';
		document.body.appendChild(wrapp_big);
		
		var field_left=document.createElement('div');
		field_left.className='field_left';
		wrapp_big.appendChild(field_left);
				
		var wrapper=document.createElement('div');
		wrapper.className='wrapper';
		wrapp_big.appendChild(wrapper);
		
		var field_right=document.createElement('div');
		field_right.className='field_right';
		wrapp_big.appendChild(field_right);
		
		var footer=document.createElement('div');
		footer.className='footer';
		document.body.appendChild(footer);
		
		var footer_h1=document.createElement('h1');
		var t='O:O'; 
		footer_h1.className='footer_h1';
		footer_h1.innerHTML=t; 
		footer.appendChild(footer_h1);
		
		
		for(var j=0; j<10; j++){
			switch (j==0 || j==9){
				case true:var wr_up=document.createElement('div');
						wr_up.className='wr_up';
						wrapper.appendChild(wr_up);
						for(var i=1; i<9; i++){
						var bukva=document.createElement('div');
							bukva.className='bukva';
							bukva.innerHTML='<div>'+String.fromCharCode(73-i)+'</div>';
							wr_up.appendChild(bukva);	
						}break;
				case false:var wr_line=document.createElement('div');
						wr_line.className='wr_line';
						wrapper.appendChild(wr_line);
					for(var i=0; i<10; i++){
						switch (i==0 || i==9){
							case true:var cifra=document.createElement('div');
								cifra.className='cifra';
								cifra.innerHTML='<div>'+j+'</div>';
								wr_line.appendChild(cifra);break;
							case false:	if(j%2){
											if (i%2){
													var kletka_1=document.createElement('div');
													kletka_1.className='kletka_1';
													if((j==1||j==8)&&(i<9)) kletka_1.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[i-1]+'w.png'+'>';
															
															
													if(j==7) kletka_1.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[8]+'b.png'+'>';
													wr_line.appendChild(kletka_1);break;
													}
								
											var kletka_2=document.createElement('div');
												kletka_2.className='kletka_2';
												if((j==1||j==8)&&(i<9))  kletka_2.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[i-1]+'w.png'+'>';
													
											if(j==7) kletka_2.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[8]+'b.png'+'>';
											wr_line.appendChild(kletka_2);break;
											}
											if (i%2){	
													var kletka_2=document.createElement('div');
														kletka_2.className='kletka_2';
														if((j==1||j==8)&&(i<9)) kletka_2.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[i-1]+'b.png'+'>';
															
													if(j==2) kletka_2.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[8]+'w.png'+'>';
													wr_line.appendChild(kletka_2);break;
													}
															
											var kletka_1=document.createElement('div');
												kletka_1.className='kletka_1';
												if((j==1||j==8)&&(i<9)) kletka_1.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[i-1]+'b.png'+'>';
															
												if(j==2) kletka_1.innerHTML='<img class="figure" src='+'ChessPieces/'+chess[8]+'w.png'+'>';
												wr_line.appendChild(kletka_1);break;
						}
					
					}break;
			}
		}
		
		var ball_parent;//хранение контейнера фигуры для боковых колонок
		var k1 = document.getElementsByClassName('kletka_1');
		var k2 = document.getElementsByClassName('kletka_2');
		for(var j=0; j < k1.length; j++){
			
			k1[j].addEventListener('click', f4);
			k2[j].addEventListener('click', f4);
			k1[j].addEventListener('click', f2);
			k2[j].addEventListener('click', f2);
				
		}
		window.addEventListener("keydown", f3);
		document.addEventListener("mousedown", f5);
}