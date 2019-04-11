const initialState = {
    result: 'Здесь будет выведен результат',
    start: 1,
    end: 1
    
}

export default function rootReducer(state = initialState, actions){

    switch(actions.type){
        case 'CALCULATION__PATH':
            //точка старта
            let vStart = actions.start 
            //конечная точка
            let vEnd  = actions.end 
            //json графа
            const graf = actions.graph

            //визиты
            let visite = []
            //дистанции
            let dist = []
            //получение массива с точками и дистанциями из json
            let pointer = graf.graph
            //получение длины массива с точками и дистанциями из json
            let arr = pointer.length
        
            //массив контенер
                let v=[]
                    for (let xi=0; xi<arr; xi++){
                        v.push([0]);
                        v[xi] = [];
                            for (let yj=0; yj<arr; yj++){
                                v[xi].push(0);
                        }
                }

           
            //установка начальных значений визитов и дистанцей заполнение матрицы
                for(let i = 0; i< arr ;i++){
                    let a = pointer[i].vertex1  //вершина 1
                    let b = pointer[i].vertex2  //вершина 2
                    let d = pointer[i].distance //дистанция между вершинами
                    v[a][b] = v[b][a]  = d
                    visite[i] = false //для каждой вершины визит устанавливаем false
                    dist[i] = Infinity //изначально дистанции равны бесконечности
                }
        
            //очередь прохождения по вершинам
            let VertexName = []

            //массив очередь для работы цикла while
            let queue = [] 
            queue.push(vStart)

            //дистанция первой вершины равна 0
            dist[vStart] = 0 
            //визит первой вершины true так как мы изначально находимся в ней
            visite[vStart] = true 
            //вывод результата кратчайшего пути от стартовой вершины до всех имеющихся вершин
            let allVerticesRes = [] 
            while(queue.length !== 0){
                let vertex = queue.shift()
                for(let j=1; j<v[vertex].length; j++){
                    //если вершина еще не посищена и имеется ребро от этой вершины и растоение до вершины меньше чем бесконечность
                    if(!visite[j] && v[vertex][j] && v[vertex][j]+dist[vertex]<dist[j]){
                        //записываем дистанцию 
                        dist[j] = v[vertex][j] + dist[vertex];   
                        // имя вершины в которую зашли    
                        VertexName[j-1] =j 
                        // добавляем вершину в очередь
                        queue.push(j)
                    }
                }
             }
        
             for(let r = 1; r <= graf.colvoVertex; r++){
                allVerticesRes[r-1] = 'до: '+VertexName[r-1]+' = '+ dist[r]
             }
             //удалить из масива путь стартовой вершины
             allVerticesRes.splice(vStart-1, 1) 
             let queueEnd = []
             queueEnd.push(vEnd)
             let end = vEnd
             let weight = dist[vEnd]
             let ver = []; // массив посещенных вершин
             ver[0] = end; // начальный элемент - конечная вершина
             let k = 1; // индекс предыдущей вершины
        
             while(queueEnd.length !== 0){
                queueEnd.shift()
        
        
                for(let i1=1; i1<arr; i1++) // просматриваем все вершины
                    if (v[end][i1] !== 0)// если связь есть
                        {
                            let temp = weight - v[end][i1]; // определяем вес пути из предыдущей вершины
                            if (temp === dist[i1]) // если вес совпал с рассчитанным
                                {                 // значит из этой вершины и был переход
                                  //  console.log(i1)
                                    weight = temp; // сохраняем новый вес
                                    end = i1 //заменяем вершину
                                    queueEnd.push(i1);// сохраняем предыдущую вершину
                                    
                                    ver[k] = i1; // и записываем ее в массив
                                    k++;
                                }
                        }
             }
             ver.reverse()
             console.log('Матрица смежности',v)
             console.log('Расчет кратчайшего пути от вершины: '+vStart+ ' до всех имеющихся:',allVerticesRes)
             console.log('Кратчайший путь от вершины ' + vStart +' до '+ vEnd +': ', ver)
             console.log('Общий вес пути:', dist[vEnd])
             const rezult = `Кратчайший путь от вершины ${vStart}  \r\n
                            до вершины ${vEnd} проходит через вершины: ${ver}   \r\n
                            Общий вес пути:  \r\n
                            ${dist[vEnd]}`



        return {
            result: rezult
        }
     //   break

        default: return state
    }

  //  return state
   
}