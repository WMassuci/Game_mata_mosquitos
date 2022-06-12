

// mostrando a largura e altura da tela de forma automatica
  let altura = 0
  let largura = 0
  let vidas = 1
  let tempo = 15

 
  //niveis do jogo
  let criaMosquitoTempo = 1500

  let nivel = window.location.search
  nivel = nivel.replace('?', '')

  if(nivel === 'normal'){
    criaMosquitoTempo = 1500

  }else if(nivel === 'dificil'){
    criaMosquitoTempo = 1000

  }else if(nivel === 'chucknorris'){
    criaMosquitoTempo = 750
  }


  function tamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
  }

  tamanhoPalcoJogo()


  //controlando o tempo da partida, que ganha o jogo se matar os mosquitos dentro do tempo mostrado
  let cronometro = setInterval(function(){
    tempo -= 1

    if(tempo < 0){
      clearInterval(cronometro)
      clearInterval(criarMosquito)
      window.location.href = "vitoria.html"

    }else{
      document.getElementById('cronometro').innerHTML = tempo
    }
    
  }, 1000)


    function posicaoRandomica(){

      //remover o mosquito anterior caso ele exista
      if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()


        //removendo os pontos de vida caso não clicar no mosquito
        if(vidas > 3){
          window.location.href = "fim_de_jogo.html"
        }else{
          document.getElementById('v'+ vidas).src = 'imagens/coracao_vazio.png'
          vidas++
        }
      }
   
      
      //com base nos valores de altura e largura, criar posições randomicas ou seja aleatorias

      //produzindo as cordenadas de forma dinamica (valor aleatorio x largura (posicaox ) e y x altura)
      let posicaoX = Math.floor(Math.random() * largura) - 90
      let posicaoY = Math.floor(Math.random() * altura) - 90

      console.log(posicaoX, posicaoY)
      //para que a img não fica fora da tela 
      posicaoX = posicaoX < 0 ? 0 : posicaoX
      posicaoY = posicaoY < 0 ? 0 : posicaoY
     
    
      //criando o elemento html (nesse caso criar a img)
      let mosquito = document.createElement('img')
      mosquito.src = 'imagens/mosca.png'
      mosquito.className = tamanhoAleatorio() +' '+ ladoAleatorio()
      mosquito.style.left = posicaoX + 'px'
      mosquito.style.top = posicaoY + 'px'
      mosquito.style.position = 'absolute'

      //evento de audio
      mosquito.addEventListener('click', function(){
        const audio = document.querySelector('audio')
        audio.currentTime = 0.0
        audio.play()
      })

      //processo para controle de vida
      mosquito.onclick = function(){
        this.remove()
      }

      mosquito.id = 'mosquito'//atribuindo o id para nao encher a tela de mosca

      //adicionando um filho para o body que é o img (atraves de uma variavel criado anteriormente)
      document.body.appendChild(mosquito)
  }




  //criando tamanhos aleatorios do mosquito
  //ja que o random gera aletorio de 0 a 1, com essa multipl vai proximo de 3
  //quando utiliza-se o return, não precisa utilizar o break
  function tamanhoAleatorio(){
    let classe = Math.floor(Math.random() * 3)

    switch(classe){
      case 0:
        return 'mosquito1'
      
      case 1:
        return 'mosquito2'

      case 2:
        return 'mosquito3'
    }
  }



  //Função que vai mudar aleatoriamente as imagens, um mosquito olhando para direita e outro para a esquerda vice e versa

  //no random vai ser * ate 2 pois temos apenas 2 posibilidades, lado a ou lado b ( 0 e 1 )

  function ladoAleatorio(){
    let lados = Math.floor(Math.random() * 2)

    switch(lados){
      case 0:
        return 'ladoA'

      case 1:
        return 'ladoB'
    }
  }