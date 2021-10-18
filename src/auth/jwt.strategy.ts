import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
    constructor(){
        super({
            secretOrKey : 'vuejstime-coffeelearn-complex',
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
}