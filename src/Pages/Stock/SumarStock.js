

const sumarStock = (AllFaenas) => {

    let totales = []
    let total_kg_Vaca = ["Total kg Vaca", "", "", 0]
    let vaq = ["Vaquillona", 0, 0, 0]
    let vaca = ["Vaca", 0, 0, 0]
    let nov = ["Novillito", 0, 0, 0]
    let toro = ["Toro", 0, 0, 0]
    let novP = ["Novillo Pesado", 0, 0, 0]
    let capon = ["Capon", 0, "", ""]
    let chancha = ["Chancha", 0, "", ""]
    let total_kg_Cerdo = ["Total kg Cerdo", "", "", 0]
    let tropas=[]
    AllFaenas.forEach((faena) => {
        if (faena.type === "vaca") {
            tropas.push(faena.tropa)
            faena.detalle.forEach((res) => {
                if (res.stock === true) {
                    let categoria = res.categoria;
                    let kg = +res.kg;
                    let cuartoT = +res.CuartoT;
                    let cuartoD = +res.CuartoD;

                    if (cuartoT == 0 && cuartoD == 0) total_kg_Vaca[3] += kg;
                    if (cuartoT > 0) total_kg_Vaca[3] += cuartoT;
                    if (cuartoD > 0) total_kg_Vaca[3] += cuartoD

                    if (categoria === "Vaquillona") {
                        if (cuartoD > 0) vaq[2]++
                        else if (cuartoT > 0) vaq[3]++
                        else vaq[1]++
                    }
                    if (categoria === "Vaca") {
                        if (cuartoD > 0) vaca[2]++
                        else if (cuartoT > 0) vaca[3]++
                        else vaca[1]++
                    }
                    if (categoria === "Novillito") {
                        if (cuartoD > 0) nov[2]++
                        else if (cuartoT > 0) nov[3]++
                        else nov[1]++
                    }
                    if (categoria === "Toro") {
                        if (cuartoD > 0) toro[2]++
                        else if (cuartoT > 0) toro[3]++
                        else toro[1]++
                    }
                    if (categoria === "Novillo Pesado") {
                        if (cuartoD > 0) toro[2]++
                        else if (cuartoT > 0) toro[3]++
                        else novP[1]++
                    }
                }
            })
        }
        if(faena.type==="cerdo"){
            faena.detalle.forEach((res) => {
                if (res.stock === true) {
                    let categoria = res.categoria;
                    let kg = +res.kg;

                    total_kg_Cerdo[3] += kg;

                    if (categoria === "Capon") {
                        capon[1]++;
                    }
                    if (categoria === "Chancha") {
                        chancha[1]++;
                    }
                }
            })

        }
    })
    console.log(tropas)
    console.log(new Date().getTime())

    return [vaq, vaca, nov, toro, novP, total_kg_Vaca, capon, chancha, total_kg_Cerdo];
}

export default sumarStock;