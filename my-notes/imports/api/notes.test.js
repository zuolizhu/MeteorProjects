import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {

    const seedNote = {
      _id: 'testNoteId1',
      title: 'My test title',
      body: 'My test body',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const seedNoteTwo = {
      _id: 'testNoteId2',
      title: 'Things I want',
      body: 'A big house',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    //mocha lifecycle method to set up some test data
    beforeEach(function () {
      Notes.remove({});
      Notes.insert(seedNote);
      Notes.insert(seedNoteTwo);
    });

    it('insert new note', function () {
      //access function using meteor method
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      //Check the db collection Notes to see if there is the test value
      expect(Notes.findOne({ _id, userId })).toExist();
    });

    //It should pass when there is a error (a little confused...)
    it('not insert note when not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: seedNote.userId}, [seedNote._id]);

      expect(Notes.findOne({ _id: seedNote._id})).toNotExist();
    });

    it('not remove note if unauthenticated', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({}, [seedNote._id]);
      }).toThrow();
    });

    it('not remove note if invalid _id', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({userId: seedNote.userId});
      }).toThrow();
    });

    it("update note", function () {
      const title ='This is an updated title for test';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: seedNote.userId
      },  [
        seedNote._id,
        { title }
      ]);

      const note = Notes.findOne(seedNote._id);

      expect(note.updatedAt).toBeGreaterThan(0);

      expect(note).toInclude({
        title,
        body: seedNote.body
      });
    });

    it("throw error if extra update", function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: seedNote.userId
        },  [
          seedNote._id,
          { title: 'test title', name: " extra update name " }
        ]);
      }).toThrow();
    });


    it('not update note if user was not match', function() {
      const title ='This is an updated title for test';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'randomId'
      },  [
        seedNote._id,
        { title }
      ]);

      const note = Notes.findOne(seedNote._id);

      expect(note).toInclude(seedNote);
    });

    it('not update note if unauthenticated', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({}, [seedNote._id]);
      }).toThrow();
    });

    it('not update note if invalid _id', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({userId: seedNote.userId});
      }).toThrow();
    });


    it('return a users notes', function () {
      const res = Meteor.server.publish_handlers.notesPublishFunction.apply({ userId: seedNote.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(seedNote);
    });

    it('return 0 notes for none user', function () {
      const res = Meteor.server.publish_handlers.notesPublishFunction.apply({ userId: 'qwerty' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);

    });


  });
}
