var express = require('express');
var router = express.Router();
const mongoDataStore = require('../dataStoreMongo')
const { Documents } = require('../models/mongoModels')


router.get('/addDocuments', (req, res) => {
  res.render('addDocs');
});
router.post('/addDocuments', async (req, res) => {
  try {
    const docId=req.body.docId
    const docTitle=req.body.docTitle
    const docContent=req.body.docContent
    const document = new Documents({
      docId,
      docTitle,
      docContent
    });
    const Id = await mongoDataStore.addDocument(document);
    res.render('home', { message1: 'Document id', docId: Id , message2:'added to Repository'});
  } catch (error) {
    res.send('Internal server error');
  }
});
router.get('/listAllDocuments', async (req, res) => {
      let docList = await mongoDataStore.displayAllDocuments();
      res.render('displayDoc', { docList : docList});     
});
router.get('/viewDocument/:id', async (req, res) => {
  const uid=req.params.id
  let docList = await mongoDataStore.viewDocument(uid);
  docList.forEach( document => {
    var id=document.docid
    var title=document.docTitle
    var content=document.docContent
    var time=document.timestamps
    res.render('viewDoc',{id, title, content, time});
  })
});
router.get('/searchDocument', async (req, res) => { 
  const id = req.query.docId;
  let docList = await mongoDataStore.searchDocument(id);
  docList.forEach( document => {
    var id=document.docid
    var title=document.docTitle
    var content=document.docContent
    var time=document.timestamps
    res.render('searchDoc',{id, title, content, time});
  })
  if (docList.length==0)
  {
      res.render('home', { message1: 'Document with id', docId: id , message2:'does not exist'});
  }
});
router.get('/editDocument/:id', async (req, res) => {
  const uid=req.params.id
  let docList = await mongoDataStore.viewDocument(uid);
  docList.forEach( document => {
    var mongo_id=document.id
    var id=document.docid
    var title=document.docTitle
    var content=document.docContent
    res.render('editDoc',{mongo_id, id, title, content,update:''});
  })
});
router.post('/editDocument/:mongo_id', async (req, res) => {
    const mongo_id=req.params.mongo_id
    const id=req.body.docId
    const Content=req.body.docContent
    const title=req.body.docTitle
 
    const result= await mongoDataStore.editDocument(Content,mongo_id);
    if(result.acknowledged==true)
    {
      res.render('editDoc',{mongo_id,id,title,content:Content ,update:'Updated'})
    }
    else 
      res.status(500).json({ message: 'Something went wrong at our end' });
});
router.delete('/deleteDocument/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    const result = await mongoDataStore.deleteDocument(id);
    let docList = await mongoDataStore.displayAllDocuments();
    console.log(result)
    if(result.acknowledged==true)
    {
      res.render('displayDoc');
    }
    else
      res.redirect('/document/listAllDocuments');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;
