import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
var FeedPage = /** @class */ (function () {
    function FeedPage(afs, user) {
        var _this = this;
        this.afs = afs;
        this.user = user;
        console.log(this.user.getUID());
        var pets = this.afs.collection("pets", function (ref) {
            return ref.where('uidOwner', '==', _this.user.getUID());
        });
        this.userPets = pets.valueChanges();
        this.userPets.subscribe(function (res) {
            console.log(res);
            res.forEach(function (item) {
                console.log(item.namePet);
            });
        });
    }
    FeedPage.prototype.ngOnInit = function () {
    };
    FeedPage = __decorate([
        Component({
            selector: 'app-feed',
            templateUrl: './feed.page.html',
            styleUrls: ['./feed.page.scss'],
        }),
        __metadata("design:paramtypes", [AngularFirestore,
            UserService])
    ], FeedPage);
    return FeedPage;
}());
export { FeedPage };
//# sourceMappingURL=feed.page.js.map