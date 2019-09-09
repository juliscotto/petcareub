import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
var PetService = /** @class */ (function () {
    function PetService(user, afs) {
        this.user = user;
        this.afs = afs;
    }
    PetService.prototype.getPetsList = function () {
        var _this = this;
        var pets = this.afs.collection("pets", function (ref) {
            return ref.where('uidOwner', '==', _this.user.getUID());
        });
        this.petData = pets.valueChanges();
        return this.petData;
    };
    /*getPetsList() {
        let posts = [];
        this.afAuth.authState.subscribe(user => {
            this.user = user;
           
            this.afstore.collection<any>("pets", ref => ref.where('uidOwner', '==', this.user.uid)).valueChanges().subscribe(data => {
                posts.push(data);
            })


            //this.afstore.collection<any>("pets", ref => ref.where('uidOwner', '==', this.user.uid)).valueChanges()
        });

        
        return posts

        
        
       
       
       
   }*/
    PetService.prototype.setPet = function (pet) {
        this.pet = pet;
    };
    PetService.prototype.getID = function () {
        return this.pet.id;
    };
    PetService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UserService,
            AngularFirestore])
    ], PetService);
    return PetService;
}());
export { PetService };
//# sourceMappingURL=pet.service.js.map