"use strict";
exports.__esModule = true;
exports.CategoryChildBuilder = void 0;
var CategoryChildBuilder = /** @class */ (function () {
    function CategoryChildBuilder() {
    }
    CategoryChildBuilder.prototype.generateCategoryList = function (data) {
        var _this = this;
        var nested = data.reduce(function (initial, value, index, original) {
            if (value.parentId === 0 || value.parentId === null) {
                if (initial.left.length)
                    _this.checkLeftOvers(initial.left, value);
                delete initial.parentId;
                value.root = true;
                initial.nested.push(value);
            }
            else {
                var parentFound = _this.findParent(initial.nested, value);
                if (parentFound)
                    _this.checkLeftOvers(initial.left, value);
                else
                    initial.left.push(value);
            }
            return index < original.length - 1 ? initial : initial.nested;
        }, { nested: [], left: [] });
        return nested;
    };
    /**
     * Check for leftover in the list of category for generating deep link
     * @param leftOvers
     * @param possibleParent
     */
    CategoryChildBuilder.prototype.checkLeftOvers = function (leftOvers, possibleParent) {
        for (var i = 0; i < leftOvers.length; i++) {
            if (leftOvers[i].parentId === possibleParent.id) {
                delete leftOvers[i].parentId;
                possibleParent.children ? possibleParent.children.push(leftOvers[i]) : possibleParent.children = [leftOvers[i]];
                possibleParent.count = possibleParent.children.length;
                var addedObj = leftOvers.splice(i, 1);
                this.checkLeftOvers(leftOvers, addedObj[0]);
            }
        }
    };
    /**
     * Find the parent of the category
     * @param possibleParents
     * @param possibleChild
     * @returns
     */
    CategoryChildBuilder.prototype.findParent = function (possibleParents, possibleChild) {
        var found = false;
        //Loop through all the possible parents
        for (var i = 0; i < possibleParents.length; i++) {
            //Check for the parent's id with current id
            if (possibleParents[i].id === possibleChild.parentId) {
                found = true;
                delete possibleChild.parentId;
                if (possibleParents[i].children)
                    possibleParents[i].children.push(possibleChild);
                else
                    possibleParents[i].children = [possibleChild];
                possibleParents[i].count = possibleParents[i].children.length;
                return true;
            }
            else if (possibleParents[i].children)
                found = this.findParent(possibleParents[i].children, possibleChild);
        }
        return found;
    };
    return CategoryChildBuilder;
}());
exports.CategoryChildBuilder = CategoryChildBuilder;
