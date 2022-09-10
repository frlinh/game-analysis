$('#example').dataTable({
    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": "archive/archive.txt",
    "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
           $('td:eq(2)', nRow).html('<a href="data.js=' + aData[2] + '">' +
               aData[2] + '</a>');
           return nRow;
       },
});