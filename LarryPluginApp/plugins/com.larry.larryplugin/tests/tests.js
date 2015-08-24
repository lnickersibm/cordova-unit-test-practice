/**
 * Created by lnickers on 8/20/15.
 */

exports.defineAutoTests = function(){

    describe('Larry Plugin', function(){

        var success = function(done){

            expect(true).toBe(true);

            done();
        };

        var failure = function(done, context){
            if(context){
                if (context.done) return;
                context.done = true;
            }

            expect(true).toBe(true);

            setTimeout(function(){
                done();
            });
        };

        it('should exist', function(){
            expect(LarryPlugin.coolMethod()).not.toBeDefined();
        });

        it('one should be one', function(){
            expect(1).toBe(1);
        });

        it('should be called', function(){
            spyOn(LarryPlugin, 'coolMethod');

            // call it
            LarryPlugin.coolMethod();

            expect(LarryPlugin.coolMethod).toHaveBeenCalled();
        });


        it('should not be called', function(){
            spyOn(LarryPlugin, 'coolMethod');

            // don't call it
            //LarryPlugin.coolMethod();

            expect(LarryPlugin.coolMethod).not.toHaveBeenCalled();
        });


        it('should be called with arguments', function(){
            spyOn(LarryPlugin, 'coolMethod');

            // call it
            LarryPlugin.coolMethod("YO MAN");

            expect(LarryPlugin.coolMethod).toHaveBeenCalledWith("YO MAN");
        });

        it('should be called with arguments and fail', function(){
            spyOn(LarryPlugin, 'coolMethod');

            // call it
            LarryPlugin.coolMethod("YO MAN broken");

            expect(LarryPlugin.coolMethod).not.toHaveBeenCalledWith("YO MAN");
        });


        it('should call the callback with the same agrument', function(done){
            // call it
            LarryPlugin.coolMethod("YO MAN", success(done), failure.bind(done));
        });


        var foo = null;

        //beforeEach(function(){
            foo = {
                anotherSuccess : function(done){
                    // NOTE!!!:  this expect is NEEDED in the call back to supress a
                    //warning:
                    // SPEC HAS NO EXPECTATIONS
                    expect(true).toBe(true);
                    done();
                }
            };
        //});

        it('should call the anotherSuccess callback with the same agrument', function(done){

            spyOn(foo,'anotherSuccess').and.callThrough();

            // call it
            LarryPlugin.coolMethod("YO MAN",foo.anotherSuccess(done), failure.bind(done));

            // ASSERT
            expect(foo.anotherSuccess).toHaveBeenCalledWith("YO MAN");
        });

    });
};