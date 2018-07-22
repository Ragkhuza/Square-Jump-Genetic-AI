class DNA {
  constructor(newGenes, mutated) {
    this.genes = [];
    if (mutated) {
      this.mutated = true;
    } else {
      this.mutated = false;
    }

    if (newGenes) {
      this.genes[0] = newGenes;
    } else {
      this.genes[0] = random(300, 1000);
    }
  }

  // mutate genes based on mutation probability
  mutate(mutationRate) {
    if (random(1) < mutationRate) {
      console.log('A child gene has mutated');
      this.mutated = true;
      this.genes[0] = random(1000);
    }
  }

  mates(partnerGenes) {
    // let partnerGene = int(partnerGenes.genes[0]);
    let myGene = int(this.genes[0]);
    // let avgGenes = int((myGene + partnerGene) / 2); // get the average
    // let diffGenes = Math.abs(myGene - partnerGene); // ensure it's a positive number
    let tossCoin = int(random(4, 10)); // generates 1, 2, 3
    let childGenes;

    switch (tossCoin) {
      // case 1:
      //   childGenes = avgGenes;
      //   if (!pass[tossCoin]) console.log('generated an average Genes: ', childGenes); pass[tossCoin] = true; //[DEBUG] log only once
      //   break;
      // case 2:
      //   childGenes = avgGenes - diffGenes;
      //   if (!pass[tossCoin]) console.log('generated a lower than average Genes: ', childGenes); pass[tossCoin] = true; //[DEBUG] log only once
      //   break;
      // case 3:
      //   childGenes = avgGenes + diffGenes;
      //   if (!pass[tossCoin]) console.log('generated a higher than average Genes: ', childGenes); pass[tossCoin] = true; //[DEBUG] log only once
      //   break;
      case 4:
      case 5:
      case 6:
      childGenes = myGene + 10;
      if (!pass[4]) console.log('generated a plus Genes: ', childGenes, ' myGene: ', myGene); pass[4] = true; //[DEBUG] log only once
        break;
      case 7:
      case 8:
      case 9:
      childGenes = myGene - 10;
      if (!pass[5]) console.log('generated a minus Genes: ', childGenes, ' myGene: ', myGene); pass[5] = true; //[DEBUG] log only once
        break;
      default:
        console.log('WARNING! Used default value in DNA.js. tossCoin: ', tossCoin);
        childGenes = avgGenes;
    }

    return new DNA(childGenes);
  }
}
