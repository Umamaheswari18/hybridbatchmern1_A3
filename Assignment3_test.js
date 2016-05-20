//Including the File System
var fs=require('fs');

//Merging three CSV Files into merge.csv
function appendCSV(file,appendFile1,appendFile2,appendFile3)
{
  //Reading the CSV File
  fs.readFile(appendFile1, function(err,data)
            {
                if (err) throw err;
                console.log("File1 read");
                fs.appendFile(file,data,function(err)
                {
                    if(err) throw err;
                    console.log("File1 Appended");
                    fs.readFile(appendFile2, function(err,data)
                    {
                        if (err) throw err;
                        console.log("File2 read");
                        fs.appendFile(file,data,function(err)
                        {
                            if(err) throw err;
                            console.log("File2 Appended");
                            fs.readFile(appendFile3, function(err,data)
                            {
                                if (err) throw err;
                                console.log("File3 read");
                                fs.appendFile(file,data,function(err)
                                {
                                    if(err) throw err;
                                    console.log("File3 Appended");
                                });
                            });
                        });
                    });
                });
            });

}

//Input CSV Files
file='merge.csv';
appendFile1='India2011.csv';
appendFile2='IndiaSC2011.csv';
appendFile3='IndiaST2011.csv';

appendCSV(file,appendFile1,appendFile2,appendFile3);


//Creating the First json for Age-wise Literate Population

var fs=require('fs');
var csv='merge.csv';

//Reading the CSV File
fs.readFile(csv, function(err,data)
            {
                if (err) throw err;
                console.log("File was read");
                newData=data.toString();

                //Split the CSV File
                var lines=newData.split("\n");

                var result = [];

                var headers=lines[0].split(",");
                var literate=0;
                var ageArray=[];
                var k=0;

                for(var i=2;i<=29;i++)
                {
                  temp=lines[i].split(",");
                  ageArray[k]=temp[5];
                  k++;
                }

                var obj=[{}];

                for(var k=0;k<ageArray.length;k++)
                {
                      var literate=0;
                      for(var i=2;i<lines.length;i++)
                      {
    	                   var currentline=lines[i].split(",");

                         if(currentline[4]=="Total" && currentline[5]==ageArray[k])
                         {
                           literate=parseInt(literate)+ parseInt(currentline[12]);
                         }
                      }
                      literate=(literate/929164282)*100;
                      literate=Math.round(literate);

                      if(literate!=0)
                      {
                          obj={'Age_Group':ageArray[k],'Literate_Persons':literate.toString()};
                          result.push(obj);
                      }
	               }

                 fs.writeFile('result.json',JSON.stringify(result),function (err)
                 {
                    if(err) throw err;
                    console.log("Saved");
                  });

  });


//Creating the second json file for Education- Literate People

var csv='merge.csv';

fs.readFile(csv, function(err,data)
            {
                if (err) throw err;
                console.log("File was read");
                newData=data.toString();

                var lines=newData.split("\n");


                var result = [];
                var headers=lines[0].split(",");
                var literarcy=0;

                var educationArray=["Without Education","Below Primary","Primary","Middle","Matric","HSC","Non-Technical Diploma"
                ,"Technical Diploma","Graduate","Unclassified"];

                var obj=[{}];
                var column=15;
                var key;

                for(var k=0;k<educationArray.length;k++)
                {
                      var literarcy=0;
                      for(var i=1;i<lines.length;i++)
                      {
          	               var currentline=lines[i].split(",");

                           if(currentline[4]=="Total" && currentline[5]=="All ages")
                           {
                            literarcy=parseInt(literarcy)+ parseInt(currentline[column]);
                            }
                      }

                      literarcy=literarcy/1000000;
                      literarcy=literarcy.toFixed();

                      key=educationArray[k];
                      obj={'Education_Level':key,'Literate_Persons':literarcy};
                      result.push(obj);

                      column+=3;
                }

                fs.writeFile('result2.json',JSON.stringify(result),function (err)
                {
                        if(err) throw err;
                        console.log("Saved");
                });

});
