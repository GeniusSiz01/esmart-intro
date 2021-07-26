module.exports = function binSimulator(){
    const binList = [
        {bin_type:"general waste", percentage:0}, 
        {bin_type:"plastic waste", percentage:0},
        {bin_type:"glass waste", percentage:0},
        {bin_type:"metal tins waste", percentage:0}
      ]
    //    binList.forEach( binType => { 
    //        if (binType.percentage < 100){
    //         let randomNumber = Math.floor(Math.random()*10);
    //         if ((binType.percentage + randomNumber) <= 100){
    //             binType.percentage += randomNumber;
    //         }}
    //     })           
      for(let i = 0; i < binList.length; i++ ){
        if (binList[i].percentage < 100){
            let randomNumber = Math.floor(Math.random()*100);
            if ((binList[i].percentage + randomNumber) <= 100){
                binList[i].percentage += randomNumber;
        }}
      }
      return binList
};