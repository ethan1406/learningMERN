import express from 'express';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import config from '../config';


let mdb;

MongoClient.connect(config.mongodbUri, (err, db) => {
	assert.equal(null, err);

	mdb = db;


});


//import data from '../src/testData';

const router = express.Router();

// const contests = data.contests.reduce((obj, contest) => {
// 	obj[contest.id] = contest;
// 	return obj;
//    }, {});

// router.get('/contests', (req, res) => {
//   res.send({
//    contests: contests
// 	});
// });


// router.get('/contests/:contestId', (req, res) => {
//  let contest = contests[req.params.contestId];
//  contest.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid impedit laborum, ex fugiat accusantium. Alias non doloremque, similique expedita architecto aut doloribus necessitatibus, itaque iste nobis, labore quis dolore ipsam?';

//   res.send(contest);
// });


router.get('/contests', (req, res) => {
	//mdb...
	let contests = {};
	mdb.collection('contests').find({})
		.project({
			id: 1,
			categoryName: 1,
			contestName: 1
		})
		.each((err, contest)=>{
			assert.equal(null, err);
			if(!contest){
				res.send({contests});
				return;
			}
			contests[contest.id] = contest;
		});
});

router.get('/contests/:contestId', (req, res) => {
	mdb.collection('contests')
		.findOne({id: Number(req.params.contestId)})
		.then(contest => res.send(contest))
		.catch(console.error);
});




router.get('/names/:nameIds', (req, res) => {
	//mdb... 
	const nameIds = req.params.nameIds.split(',').map(Number) ; 
	let names = {};
	mdb.collection('names').find({id: {$in: nameIds}})
		.each((err, name)=>{
			assert.equal(null, err);
			if(!name){
				res.send({names});
				return;
			}
			names[name.id] = name;
		});
});



export default router;
