const calcOptionName = (type) => {
    let src = 'Lumbermill'
    switch (type) {
        case 0:
            src = 'Gold mine'
            break;
        case 1:
            src = 'Lumbermill'
            break;
        case 2:
            src = 'Ore mine'
            break;
        case 3:
            src = 'Farm'
            break;
        default:
            src = 'Lumbermill'
            break;
    }
    return src
}

const calcResourceName = (type) => {
    let src = 'wood'
    switch (type) {
        case 0:
            src = 'gold'
            break;
        case 1:
            src = 'wood'
            break;
        case 2:
            src = 'iron'
            break;
        case 3:
            src = 'food'
            break;
        default:
            src = 'Wood'
            break;
    }
    return src
}

const calcBuildingName = (type) => {
    let src = 'Lumbermill'
    switch (type) {
        case 0:
            src = 'Gold mine'
            break;
        case 1:
            src = 'Lumbermill'
            break;
        case 2:
            src = 'Ore mine'
            break;
        case 3:
            src = 'Farm'
            break;
        default:
            src = 'Lumbermill'
            break;
    }
    return src
}


const calcGatheringName = (type) => {
    let src = 'Chopping trees in the forest'
    switch (type) {
        case 0:
            src = 'Mining gold'
            break;
        case 1:
            src = 'Chopping trees in the forest'
            break;
        case 2:
            src = 'Mining ore'
            break;
        case 3:
            src = 'Hunting'
            break;
        default:
            src = 'Chopping trees in the forest'
            break;
    }
    return src
}
const calcFood = (resources) => {
    let res = 0
    resources.forEach(resource => {
        if (resource.type === 3) res = resource.amount
    })
    return res
}


const calcName = (email) => {
    return email.split('@')[0]
}

export { calcBuildingName, calcOptionName, calcResourceName, calcName, calcGatheringName, calcFood }