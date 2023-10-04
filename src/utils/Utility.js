const utility = {

  capitaliseEachInitial: function (text) {
    if (text && text.length > 0) {
      const small_txt = text.toLowerCase();
      const str = small_txt.split(' ');
      for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
      return str.join(' ');
    }
  },
  getCobinations: (...args) => {
    let r = [];
    let max = args.length - 1;
    function helper(arr, i) {
      for (let j = 0, l = args[i].length; j < l; j++) {
        let a = arr.slice(0); // clone arr
        a.push(args[i][j]);
        if (i === max) r.push(a);
        else helper(a, i + 1);
      }
    }
    helper([], 0);
    return r;
  },
  getDateFormat:function(year){
    let yearsFormat=[]
    https://a.salesberry.supremeitsolutions.com/orders?&filter[limit]=10&filter[skip]=0&filter[where][createdOn][between][0]=2022-09-09T00:00:00.000Z&filter[where][createdOn][between][1]=2022-09-09T23:59:59.999Z&&filter[order]=createdOn%20DESC
    year.map((date,i)=>{
      for(let j=0;j<12;j++){
          yearsFormat.push( {from:`${date}-${j+1}-00T00:00:00.000Z`,to:`${date}-${j+1}-30T23:59:59.000Z`});
      }
    })
    return yearsFormat
  }
};

export default utility;
