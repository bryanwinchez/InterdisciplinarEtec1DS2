// --- CÓDIGO DOS GRÁFICOS ---
document.addEventListener("DOMContentLoaded", function () {

    // Define a fonte padrão para todos os gráficos
    Chart.defaults.font.family = "'Poppins', 'Arial', sans-serif";
    Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';

    // --- GRÁFICO RADAR ---
    if (document.getElementById('radarChart')) {
        const radarCtx = document.getElementById('radarChart').getContext('2d');
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Ataque', 'Defesa', 'Posse', 'Físico', 'Técnica', 'Experiência'],
                datasets: [
                    { label: 'PSG', data: [90, 80, 85, 82, 88, 85], backgroundColor: 'rgba(255, 0, 85, 0.2)', borderColor: 'rgba(255, 0, 85, 1)', pointBackgroundColor: 'rgba(255, 0, 85, 1)' },
                    { label: 'Atlético', data: [82, 88, 75, 85, 80, 90], backgroundColor: 'rgba(255, 59, 59, 0.2)', borderColor: 'rgba(255, 59, 59, 1)', pointBackgroundColor: 'rgba(255, 59, 59, 1)' },
                    { label: 'Botafogo', data: [85, 78, 80, 83, 82, 75], backgroundColor: 'rgba(255, 204, 0, 0.2)', borderColor: 'rgba(255, 204, 0, 1)', pointBackgroundColor: 'rgba(255, 204, 0, 1)' },
                    { label: 'Seattle', data: [75, 75, 78, 80, 75, 70], backgroundColor: 'rgba(0, 217, 255, 0.2)', borderColor: 'rgba(0, 217, 255, 1)', pointBackgroundColor: 'rgba(0, 217, 255, 1)' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 12 } },
                        ticks: { backdropColor: 'transparent', color: 'rgba(255, 255, 255, 0.7)' }
                    }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { color: 'rgba(255, 255, 255, 0.8)', boxWidth: 15, padding: 20 } }
                }
            }
        });
    }

    // --- GRÁFICO DE PROBABILIDADE (DOUGHNUT) ---
    if (document.getElementById('probabilityChart')) {
        const probabilityCtx = document.getElementById('probabilityChart').getContext('2d');
        new Chart(probabilityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Botafogo', 'PSG', 'Atlético', 'Seattle'],
                datasets: [{
                    data: [45, 30, 20, 5],
                    backgroundColor: ['rgba(71, 71, 71, 0.8)', 'rgba(255, 0, 85, 0.8)', 'rgba(0, 217, 255, 0.8)', 'rgba(46, 67, 48, 0.8)'],
                    borderColor: ['#0a0a14'],
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: 'rgba(255, 255, 255, 0.8)', boxWidth: 15, padding: 20 } },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.label + ': ' + context.raw + '% de chance';
                            }
                        }
                    }
                }
            }
        });
    }
});


// --- LÓGICA DO LOADER (COM CONTROLO DE SESSÃO) ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');

    // Verifica se o loader já foi exibido nesta sessão
    if (sessionStorage.getItem('loaderShown')) {
        // Se já foi mostrado, esconde-o imediatamente
        if (loader) {
            loader.style.display = 'none';
        }
    } else {
        // Se é a primeira visita na sessão, mostra o loader e depois esconde-o
        if (loader) {
            // Marca que o loader foi exibido para não aparecer novamente
            sessionStorage.setItem('loaderShown', 'true');

            // Define um tempo de 3 segundos para o loader desaparecer
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 3000); 
        }
    }
});