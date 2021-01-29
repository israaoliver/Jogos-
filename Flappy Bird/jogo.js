console.log('Flappy Bird');

const sonDe_HIT = new Audio();

sonDe_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
let frames = 0;

sprites.src = './sprites.png';

const canvas = document.querySelector('canvas'); 
const contexto = canvas.getContext('2d');

// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura , this.altura, 
            this.x, this.y, 
            this.largura , this.altura, 
        );
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura , this.altura, 
            (this.x + this.altura), this.y, 
            this.largura , this.altura, 
        );
    }
}
// [Chão]
function criaChao()
{
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza(){
            const movimentoDoChao = 1;
            const repetemEm = chao.largura / 20;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repetemEm;
        },
        desenha(){
            contexto.drawImage(
                sprites,
                this.spriteX, this.spriteY, 
                this.largura , this.altura, 
                this.x, this.y, 
                this.largura , this.altura, 
            );
            contexto.drawImage(
                sprites,
                this.spriteX, this.spriteY, 
                this.largura , this.altura, 
                (this.x + this.altura), this.y, 
                this.largura , this.altura, 
            );
        }
    }
    
    return chao;
}

function fazcolisao(flappyBird , chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){

        return true;
    }

    return false;
}

function criaFlappyBird()
{
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 25,
        x: 10,
        y: 50,
        pulo: 4.6,
    
        gravidade: 0.25,
        velocidade : 0,
    
        pula(){
            flappyBird.velocidade = - flappyBird.pulo;
        },
    
        atualiza(){
    
            if(fazcolisao(flappyBird , globais.chao))
            {
                sonDe_HIT.play();
                mudaParaTela(Telas.INICIO);
                console.log('fez colisão');
                return;
    
            }
            this.velocidade = this.velocidade + this.gravidade;
            this.y = this.y + this.velocidade;
    
            console.log(this.velocidade);
    
        },

        movimentos: [
            { spriteX : 0, spriteY : 0}, // asa pra cima
            { spriteX : 0, spriteY : 26}, // asa pra meio
            { spriteX : 0, spriteY : 51}, // asa pra baixo
            { spriteX : 0, spriteY : 26}, // asa pra meio
        ],

        frameAtual : 0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;
            if(passouOIntervalo){
                
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
    
        desenha(){
            flappyBird.atualizaOFrameAtual();
            const { spriteX , spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // posição X no sprite , posição Y no Sprite 
                flappyBird.largura , flappyBird.altura, // Tamnho do recorta da sprite
                flappyBird.x, flappyBird.y, // posição no canvas
                flappyBird.largura , flappyBird.altura, //tamanho no canvas
            );
    
        }
    }

    return flappyBird;
}


// [mensagemGetReady]
const mensagemGetReady = {
    sx: 134, 
    sy: 0,
    w: 174, 
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            this.sx, this.sy,
            this.w, this.h,
            this.x, this.y,
            this.w, this.h,

        );
    }
}

//
// [Telas]
//
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa)
    {
        telaAtiva.inicializa();
    }

}

const Telas = {
    INICIO : {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();

        },
        desenha(){
            planoDeFundo.desenha()
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        }, 
        click(){
            mudaParaTela(Telas.JOGO);

        },
        atualiza(){

            globais.chao.atualiza();

        }
    }
};

Telas.JOGO = {
    desenha(){

        planoDeFundo.desenha()
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click()
    {
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
    }
};

function loop(){
    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    frames += 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click' , function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
mudaParaTela(Telas.INICIO);
loop();