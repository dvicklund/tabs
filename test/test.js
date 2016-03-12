var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Tab = require(__dirname + "/../models/tabModel");

require(__dirname + "/../server");
process.env.MONGOLAB_URI = "mongodb://localhost/tabdb_test";

describe('routes', function() {

  describe('tab routes', function() {
    it('should be able to make a new tab', function(done) {
      var tabData = {title: "allspice"};
      chai.request('localhost:3000')
        .post('/api/tab')
        .send(tabData)
        .end(function(err, res) {
          expect(err).to.eql(null);
          console.log(res.body);
          expect(res.body.title).to.eql('allspice');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should get all tabs', function(done) {
      chai.request('localhost:3000')
        .get('/api/tabs')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });

    describe('tab transformation', function() {
      beforeEach(function(done) {
        (new Tab({name: 'thyme'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.tab = data;
          done();
        }.bind(this));
      });

      it('should be able to modify some tab', function(done) {
        chai.request('localhost:3000')
          .put('/api/tab/' + this.tab._id)
          .send({name: 'rosemary'})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('nailed it');
            done();
          });
      });

      it('should be able to remove tab', function(done) {
        chai.request('localhost:3000')
          .delete('/api/tab/' + this.tab._id)
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('nailed it');
            done();
          });
      });
    });
  });

  describe('auth routes', function() {
    it('should be able to create a user', function(done) {
      chai.request('localhost:3000')
        .post('/api/signup')
        .send({username: 'test', password: 'pass'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should sign a user in', function(done) {
      chai.request('localhost:3000')
        .get('/api/signin')
        .auth('test', 'pass')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should refuse bad username', function(done) {
      chai.request('localhost:3000')
        .get('/api/signin')
        .auth('wrong', 'bad')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql('You do not exist!  (Try creating a user)');
          done();
        });
    });

    it('should refuse bad password', function(done) {
      chai.request('localhost:3000')
        .get('/api/signin')
        .auth('test', 'bad')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.eql("Plz don't feed the trolls");
          done();
        });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
