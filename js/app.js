    // Opciones de configuración de Plyr
    const options = {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'fullscreen'
        ],
        settings: ['captions', 'quality', 'speed'],
        youtube: { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const player = new Plyr('#player', options);
        const listamario = document.querySelector('.accordiones');

        function cargarVideos() {
            fetch('../data/videos.json')
                .then(response => response.json())
                .then(data => {
                    listamario.innerHTML = '';
                    for (const categoria in data) {
                        if (data.hasOwnProperty(categoria)) {
                            const categoriaData = data[categoria];

                            const accordionli = document.createElement('li');
                            accordionli.classList.add('accordion');

                            const accordion_header = document.createElement('div');
                            accordion_header.classList.add('accordion-header');
                            accordion_header.innerHTML = `
                                <span>${categoriaData.nombre}</span>
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 14.469L1 6.46897L1.96897 5.5L9 12.531L16.031 5.5L17 6.46897L9 14.469Z"
                                        fill="black" />
                                </svg>
                            `;
                            accordionli.appendChild(accordion_header);

                            const content_accordion = document.createElement('div');
                            content_accordion.classList.add('content-accordion');

                            const clasesdiv = document.createElement('div');
                            clasesdiv.classList.add('clases');

                            categoriaData.videos.forEach(video => {
                                const clasediv = document.createElement('div');
                                clasediv.classList.add('clase')
                                const div_clase_contenido = document.createElement('div');
                                div_clase_contenido.classList.add('clase-contenido');
                                div_clase_contenido.setAttribute('data-video-id', video.id);
                                div_clase_contenido.innerHTML = `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7z"/>
                                    </svg>
                                    <h4>${video.titulo}</h4>
                                `;
                                clasediv.appendChild(div_clase_contenido);
                                clasesdiv.appendChild(clasediv);
                            });
                            content_accordion.appendChild(clasesdiv);
                            accordionli.appendChild(content_accordion);
                            listamario.appendChild(accordionli);
                        }
                    }
                     // Inicializar funcionalidad del acordeón después de cargar los videos
                     inicializarAcordeon();
                })
                .catch(error => console.error('Error en el fetch:', error));
        }

        // Delegación de eventos para los elementos de video (maneja elementos dinámicos)
        listamario.addEventListener('click', (event) => {
            const claseContenido = event.target.closest('.clase-contenido');
            // console.log("clase contenido",claseContenido)
            if (claseContenido) {
                let videoId = claseContenido.dataset.videoId;
                player.source = {
                    type: 'video',
                    sources: [
                        {
                            src: videoId,
                            provider: 'youtube',
                        },
                    ],
                };
            }
        });
        /*funcionalidad para abrir los cards*/ 
        function inicializarAcordeon() {
            //seleccionamos primero el padre contenedor de los accordiones
            const accordiones_padre=document.getElementById('lista-curso');
            accordiones_padre.addEventListener('click',(event)=>{
                //con esto obtenemos pues la cabecera de cada uno
                 const headercurso=event.target.closest('.accordion-header');
                //  console.log("cabecera de tema",headercurso);
                if((headercurso)){
                     const accordion=headercurso.parentNode;
                     //con esto seleccionamos un tema de accordiones el padre
                    //  console.log("accordion",accordion);
                    /*con esto seleccionamos el contenido del acordion para despues darle el espacio*/
                     const contenido_accordion=accordion.querySelector('.content-accordion');
                    //  console.log("contenido curso",contenido_accordion);
                    //aqui el padre le agregamos la clase active
                     accordion.classList.toggle("active");
                    //  console.log("activo padre",accordion.classList.contains("active"));
                    //en caso de que el se diferente pues le metemos estas medidas
                    contenido_accordion.style.height = (contenido_accordion.scrollHeight + 30) + "px";
                    //en caso de que no este activo por default cera la altura cero
                    if (!accordion.classList.contains("active")) {
                            contenido_accordion.style.height = "0px";
                        }

                }   
            })

        }

        cargarVideos(); // Llama a cargarVideos para iniciar el proceso
    });