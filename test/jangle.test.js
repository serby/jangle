describe('jangle', function() {

  it('should return a object with a run method', function() {
    var jangle = require('../').jangle;
    jangle().should.be.a('object');
    jangle().run.should.be.a('function');
  });

  describe('#run()', function() {

    it('should run when empty', function(done) {
      var jangle = require('../').jangle;

      jangle().run(function() {
        arguments.length.should.equal(0);
        done();
      });
    });

    it('should run sequence', function(done) {
      var jangle = require('../').jangle
        , counter = 0;

      jangle()
      .seq(function(done) {
        counter += 1;
        done();
      })
      .run(function() {
        counter.should.equal(1);
        done();
      });
    });

    // it('should run sequence until detect returns true', function(done) {
    //   var jangle = require('../').jangle
    //     , counter = 0;

    //   jangle()
    //   .seq(function(done) {
    //     counter += 1;
    //     done();
    //   })
    //   .seq(function(done) {
    //     counter += 1;
    //     done(null, true);
    //   })
    //   .seq(function(done) {
    //     counter += 1;
    //     done();
    //   })
    //   .detect(function(error, value) {
    //     console.log(arguments);
    //     return value === true;
    //   })
    //   .run(function() {
    //     counter.should.equal(2);
    //     done();
    //   });
    // });

  });

});