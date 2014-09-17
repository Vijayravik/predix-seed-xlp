'use strict';

//page common test module
var CommonTests = (function(){
    var CommonTests = function(pageHash, pageTitle){
        this.pageHash = pageHash;
        this.pageTitle = pageTitle;
    };

    CommonTests.prototype.navigate = function(){
        browser.get('/' + this.pageHash);
        browser.sleep(browser.params.wait);
    }

    CommonTests.prototype.pageNameAndNavTests = function(){
        var self = this;

        describe('Page Name and Nav Tests', function() {

            describe('When user hit url hash '+self.pageHash, function() {

                it('should automatically redirect to ' + self.pageHash, function() {
                    var regex = new RegExp(self.pageHash);
                    expect(browser.getLocationAbsUrl()).toMatch(regex);
                });

                it('should contain page name', function() {
                    expect(element(by.css('h1')).getText()).toMatch(self.pageTitle)
                });

            });
        });

    }

    CommonTests.prototype.applicationNameAndNavTests = function(){

        describe('Application Name and Nav Tests', function() {

            describe('When user enter application', function(){

                it('should contain application name', function() {
                    expect(element.all(by.css('.brand span')).get(1).getText()).toMatch(/Predix Seed/);
                });

                describe('the navigation menu', function() {

                    it('should have 3 elements', function(){
                        expect(element.all(by.css('.nav li')).count()).toBe(3);
                    });

                    it('should have correctly labeled tabs', function(){
                        element.all(by.css('.nav li')).then(function(elements) {
                            expect(elements[0].getText()).toBe("Page 1");
                            expect(elements[1].getText()).toBe("Page 2");
                            expect(elements[2].getText()).toBe("Page 3");
                        });
                    });

                });

            });

        });
    }

    return CommonTests;
})();


module.exports = CommonTests;