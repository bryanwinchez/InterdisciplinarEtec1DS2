document.addEventListener("DOMContentLoaded", function() {
    // Only initialize charts if the canvas elements exist
    if (document.getElementById('radarChart')) {
        const radarCtx = document.getElementById('radarChart').getContext('2d');
        const radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Ataque', 'Defesa', 'Posse', 'Físico', 'Técnica', 'Experiência'],
                datasets: [
                    {
                        label: 'PSG',
                        data: [90, 80, 85, 82, 88, 85],
                        backgroundColor: 'rgba(255, 0, 85, 0.2)',
                        borderColor: 'rgba(255, 0, 85, 1)',
                        pointBackgroundColor: 'rgba(255, 0, 85, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 0, 85, 1)'
                    },
                    {
                        label: 'Atlético',
                        data: [82, 88, 75, 85, 80, 90],
                        backgroundColor: 'rgba(255, 59, 59, 0.2)',
                        borderColor: 'rgba(255, 59, 59, 1)',
                        pointBackgroundColor: 'rgba(255, 59, 59, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 59, 59, 1)'
                    },
                    {
                        label: 'Botafogo',
                        data: [85, 78, 80, 83, 82, 75],
                        backgroundColor: 'rgba(255, 204, 0, 0.2)',
                        borderColor: 'rgba(255, 204, 0, 1)',
                        pointBackgroundColor: 'rgba(255, 204, 0, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 204, 0, 1)'
                    },
                    {
                        label: 'Seattle',
                        data: [75, 75, 78, 80, 75, 70],
                        backgroundColor: 'rgba(0, 217, 255, 0.2)',
                        borderColor: 'rgba(0, 217, 255, 1)',
                        pointBackgroundColor: 'rgba(0, 217, 255, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(0, 217, 255, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            boxWidth: 15,
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    if (document.getElementById('probabilityChart')) {
        const probabilityCtx = document.getElementById('probabilityChart').getContext('2d');
        const probabilityChart = new Chart(probabilityCtx, {
            type: 'doughnut',
            data: {
                labels: ['PSG', 'Atlético', 'Botafogo', 'Seattle'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: [
                        'rgba(255, 0, 85, 0.7)',
                        'rgba(255, 59, 59, 0.7)',
                        'rgba(255, 204, 0, 0.7)',
                        'rgba(0, 217, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 0, 85, 1)',
                        'rgba(255, 59, 59, 1)',
                        'rgba(255, 204, 0, 1)',
                        'rgba(0, 217, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            boxWidth: 15,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
});