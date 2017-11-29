//Ф-я локализации рамки
		function f2(){
			var tgt=this.previousElementSibling;
			var i=1;
			while (i<9){
			if (tgt.classList.contains("cifra")){
				var line=tgt.firstElementChild.innerText;
				break;
			}
			tgt=tgt.previousElementSibling;
			i++;
			}
			
			//отображение данных в ячейке footer
			var footer= document.getElementsByClassName('footer');
			var footer_h1=document.getElementsByClassName('footer_h1');
				footer_h1[0].parentNode.removeChild(footer_h1[0]);
				footer_h1=document.createElement('h1');
				footer_h1.className='footer_h1';
				if(document.getElementById('bordclick')){	
					footer_h1.innerHTML=String.fromCharCode(73-i)+':'+line;
				}else{footer_h1.innerHTML='O:O';} 	
				footer[0].appendChild(footer_h1);
			
		};
		//вспомогательная ф-я для ф-ции f3 
		function lokal(){
			var footer_h1=document.getElementsByClassName('footer_h1');
			var str=footer_h1[0].innerHTML;
			var ar=footer_h1[0].innerHTML.split(':');
			return ar;
		};
		
		//ф-я перемещения рамки	
		function f3(event){
			var bord=document.getElementById('bordclick');
			if(bord){
				switch(event.keyCode){
					case 37:if(!bord.previousElementSibling.classList.contains("cifra")){bord.previousElementSibling.setAttribute('id',"bordclick");bord.removeAttribute('id',"bordclick");}else{do {bord.removeAttribute('id',"bordclick");bord=bord.nextElementSibling;} while(!bord.classList.contains("cifra")); bord.previousElementSibling.setAttribute('id',"bordclick"); 
					};f2.call(bord.previousElementSibling);break;
					
					case 38:var lok=lokal();if(!bord.parentElement.parentElement.children[+lok[1]-1].classList.contains("wr_up")){bord.parentElement.parentElement.children[+lok[1]-1].children[73-lok[0].charCodeAt(lok[0])].setAttribute('id',"bordclick");bord.parentElement.parentElement.children[+lok[1]].children[73-lok[0].charCodeAt(lok[0])].removeAttribute('id',"bordclick");f2.call(bord.parentElement.parentElement.children[+lok[1]-1].children[73-lok[0].charCodeAt(lok[0])]);}else{bord.parentElement.parentElement.children[8].children[73-lok[0].charCodeAt(lok[0])].setAttribute('id',"bordclick");bord.parentElement.parentElement.children[1].children[73-lok[0].charCodeAt(lok[0])].removeAttribute('id',"bordclick");f2.call(bord.parentElement.parentElement.children[8].children[73-lok[0].charCodeAt(lok[0])]);};break;
					
					case 39:if(!bord.nextElementSibling.classList.contains("cifra")){bord.nextElementSibling.setAttribute('id',"bordclick");bord.removeAttribute('id',"bordclick");}else{do {bord.removeAttribute('id',"bordclick");bord=bord.previousElementSibling;} while(!bord.classList.contains("cifra")); bord.nextElementSibling.setAttribute('id',"bordclick"); 
					};f2.call(bord.nextElementSibling);break;
					
					case 40:var lok=lokal();if(!bord.parentElement.parentElement.children[+lok[1]+1].classList.contains("wr_up")){bord.parentElement.parentElement.children[+lok[1]+1].children[73-lok[0].charCodeAt(lok[0])].setAttribute('id',"bordclick");bord.parentElement.parentElement.children[+lok[1]].children[73-lok[0].charCodeAt(lok[0])].removeAttribute('id',"bordclick");f2.call(bord.parentElement.parentElement.children[+lok[1]+1].children[73-lok[0].charCodeAt(lok[0])]);}else{bord.parentElement.parentElement.children[1].children[73-lok[0].charCodeAt(lok[0])].setAttribute('id',"bordclick");bord.parentElement.parentElement.children[8].children[73-lok[0].charCodeAt(lok[0])].removeAttribute('id',"bordclick");f2.call(bord.parentElement.parentElement.children[1].children[73-lok[0].charCodeAt(lok[0])]);};break;
					default: console.log('Поломка!');
				}
			}
			
			
		};
		
		//Ф-я выделения клетки - рамка
		function f4() {
			var boxet=document.getElementById('bordclick');
			if (boxet){
				this.setAttribute('id',"bordclick");
				boxet.removeAttribute('id',"bordclick");
				}else this.setAttribute('id',"bordclick"); 
		};
		
		//Ф-я пермещения фигур
		//var ball_parent;//хранение контейнера фигуры для боковых колонок
		function f5(e){
			
			if(e.target.classList.contains("figure")){
			var ball = e.target;
			ball_parent=e.target.parentElement;
			
			}else return;
			
			

			    var coords = getCoords(ball);
				var coordsparent = getCoords(ball.parentElement);
				if(ball.parentElement.hasAttribute('id')) {
					coordsparent.left=coordsparent.left+7;
					coordsparent.top=coordsparent.top+7;
					//для коррекции влияния рамки толщиной 7px
				}
				var shiftX = e.pageX- coords.left;
				var shiftY = e.pageY - coords.top;
				ball.style.position = 'absolute';
				e.target.parentElement.appendChild(ball);
				
				moveAt(e);

				ball.style.zIndex = 1000; // над другими элементами

				function moveAt(e) {//ф-я движения
				
					ball.style.left = e.pageX - shiftX-coordsparent.left +'px';
					ball.style.top = e.pageY - shiftY-coordsparent.top +'px';
					// в границах игровой доски
					var ballcoord=ball.getBoundingClientRect();
					var wr_b=document.getElementsByClassName('wrapp_big');
					var wr_bcoord=wr_b[0].getBoundingClientRect();
					if (ballcoord.left<wr_bcoord.left||
						ballcoord.top<wr_bcoord.top||
						ballcoord.right>wr_bcoord.right||
						ballcoord.bottom>wr_bcoord.bottom){
						reSet(ball);
						};
					//**вариант в границах окна
					//if(ballcoord.top<0||
					//	ballcoord.left<0||ballcoord.bottom>document.documentElement.clientHeight||
					//	ballcoord.right>document.documentElement.clientWidth){
					//	reSet(ball);
					//	console.log(ballcoord.left);
					//};
				
				
				  }

				document.onmousemove = function(e) {
				moveAt(e);
				 };
				//document.onmousemove = moveAt; тоже подходит
				
				//обрабатываем завершение перемещения фигуры 
				ball.onmouseup = funcMouseUp;
				function funcMouseUp(e) {
					ball.style.display="none";
					//получаем элемент под перемещаемой фигурой
					var boxparent=document.elementFromPoint(e.clientX,e.clientY);
					ball.style.display="";
					var ball_symb=ball.src[ball.src.length-5];
					//обрабатываем перемещение на клетки и боковые колонки
					//Сюда не заходит при попадании на фигуру
					if(boxparent.classList.contains("kletka_1")||boxparent.classList.contains("kletka_2")||boxparent.classList.contains("wr_figure")){
						reSet(ball);
						boxparent.appendChild(ball);
						//перенос фигуры из боковой колонки на доску
						if(ball_parent.classList.contains("wr_figure")&&!boxparent.classList.contains("wr_figure")){
							//console.log('удалили контейнер wr_figure');
							ball_parent.parentElement.removeChild(ball_parent); 
						}//boxparent.parentElement.parentElement.removeChild(boxparent.parentElement); тоже подходит 
					}else if(boxparent.classList.contains("figure")&&!ball_parent.classList.contains("wr_figure")){
							//битую фигуру перемещаем в бок.колонку
							
							//boxparent.parentElement.removeChild(boxparent);
							//boxparent.remove(); тоже подходит
							var boxparent_symb=boxparent.src[boxparent.src.length-5];
							if((boxparent_symb==ball_symb)||
								((ball_symb=='w')&&(boxparent.parentElement.parentElement.classList.contains('field_right')))||
								((ball_symb=='b')&&(boxparent.parentElement.parentElement.classList.contains('field_left')))){ reSet(ball);}
								else{						
									wrFigure(boxparent_symb).appendChild(boxparent);
									funcMouseUp(e);
								}
						}else if((boxparent.classList.contains("field_left")||boxparent.classList.contains("field_right"))&&!ball_parent.classList.contains("wr_figure")){	
							//ручное перемещение фигуры с поля в бок.колонку
							reSet(ball);	
							wrFigure(ball_symb).appendChild(ball);
						}else if(boxparent.classList.contains("figure")&&ball_parent.classList.contains("wr_figure")){//возвращаем фигуру в родительский контейнер  при попытке 	перемещения на соседнюю фигуру в пределах боковой колонки field_left
							reSet(ball);
						}else {//возвращаем фигуру в родительский контейнер  при попытке перемещения на свободное поле в пределах боковой колонки field_left
							reSet(ball);
						};
						
					document.onmousemove = null;
					ball.onmouseup = null;
				};
			//отменяем действия браузера по умолчанию
				ball.ondragstart = function() {
				  return false;
				};
		}
		//координаты элемента относительно документа
		function getCoords(elem) { // кроме IE8
		  var box = elem.getBoundingClientRect();

		  return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		  };

		}
		
		
		//сбрасываем стили
		function reSet(ball){
			ball.style.position = '';
			ball.style.zIndex = '';
			ball.style.left ='';
			ball.style.top = '';	
		}
		//функция создания контейнера для фигуры
		function wrFigure(ball_symb){
			var field_left_right;
			var wr_figure=document.createElement('div');
			wr_figure.className="wr_figure";
				if(ball_symb=='w'){
					field_left_right=document.getElementsByClassName('field_left');
					
					}else if(ball_symb=='b'){
					field_left_right=document.getElementsByClassName('field_right');
					
					}else console.log('ошибка');
					
					field_left_right[0].appendChild(wr_figure);
			return wr_figure;
		}