const images = { 
    'background': require('../assets/gas-background.png'),
    'logo': require('../assets/leak-gas-logo.png'),
    'logo-transparente': require('../assets/leak-gas-logo-transparente.png'),
    'janela-ok': require('../assets/janela-ok.png'),
    'janela-alarme': require('../assets/janela-alarme.png'),
    'erro': require('../assets/imagem-erro.png'),
};

export default function getImage(image) { 
    return images[image]; 
}